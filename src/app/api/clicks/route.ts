import { NextResponse } from "next/server";
import { links } from "@/data/profile";
import { getClicksCollection } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const validIds = new Set(links.map((l) => l.id));

// 링크별 클릭 수 조회
export async function GET() {
  const collection = await getClicksCollection();
  if (!collection) return NextResponse.json({ enabled: false, counts: {} });

  const docs = await collection.find({}).toArray();
  const counts = Object.fromEntries(docs.map((d) => [d.linkId, d.count]));
  return NextResponse.json({ enabled: true, counts });
}

// 클릭 1회 기록
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const linkId = body?.linkId;
  if (typeof linkId !== "string" || !validIds.has(linkId)) {
    return NextResponse.json({ error: "invalid linkId" }, { status: 400 });
  }

  const collection = await getClicksCollection();
  if (!collection) return NextResponse.json({ enabled: false });

  await collection.updateOne({ linkId }, { $inc: { count: 1 } }, { upsert: true });
  return NextResponse.json({ enabled: true });
}
