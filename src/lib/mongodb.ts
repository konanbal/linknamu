import dns from "node:dns";
import { MongoClient } from "mongodb";

// 일부 Windows 환경에서 Node가 DNS 서버를 127.0.0.1로만 잡아
// mongodb+srv 주소의 SRV 조회가 ECONNREFUSED로 실패함 → 그때만 공용 DNS 사용
const isLoopback = (s: string) => s.startsWith("127.") || s === "::1";
if (dns.getServers().every(isLoopback)) {
  dns.setServers(["1.1.1.1", "8.8.8.8"]);
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

/** MONGODB_URI가 없으면 null을 반환합니다 (클릭 집계 비활성화). */
function getMongoClient(): Promise<MongoClient> | null {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;
  // 개발 모드 핫 리로드에서도 연결을 재사용하도록 global에 캐시
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(uri).connect().catch((err) => {
      // 연결 실패를 캐시해 두면 영영 재시도하지 않으므로 비워 둠
      global._mongoClientPromise = undefined;
      throw err;
    });
  }
  return global._mongoClientPromise;
}

export async function getClicksCollection() {
  const clientPromise = getMongoClient();
  if (!clientPromise) return null;
  const client = await clientPromise;
  return client
    .db(process.env.MONGODB_DB ?? "linknamu")
    .collection<{ linkId: string; count: number }>("clicks");
}
