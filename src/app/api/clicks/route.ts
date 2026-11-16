import { NextResponse } from "next/server";
import { links } from "@/data/profile";
import { getClicksCollection } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const linkIds = links.map((l) => l.id);
const validIds = new Set(linkIds);

// 모든 링크의 클릭 수를 한 번에 조회 (기록이 없는 링크는 0)
export async function GET() {
  try {
    const collection = await getClicksCollection();
    if (!collection) return NextResponse.json({ enabled: false, counts: {} });

    const docs = await collection.find({ linkId: { $in: linkIds } }).toArray();
    const counts: Record<string, number> = Object.fromEntries(linkIds.map((id) => [id, 0]));
    for (const d of docs) counts[d.linkId] = d.count;
    return NextResponse.json({ enabled: true, counts });
  } catch (err) {
    console.error("[clicks] GET failed", err);
    return NextResponse.json({ error: "db error" }, { status: 500 });
  }
}

// 클릭 1회 기록
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const linkId = body?.linkId;
  if (typeof linkId !== "string" || !validIds.has(linkId)) {
    return NextResponse.json({ error: "invalid linkId" }, { status: 400 });
  }

  try {
    const collection = await getClicksCollection();
    if (!collection) return NextResponse.json({ enabled: false });

    await collection.updateOne({ linkId }, { $inc: { count: 1 } }, { upsert: true });
    return NextResponse.json({ enabled: true });
  } catch (err) {
    console.error("[clicks] POST failed", err);
    return NextResponse.json({ error: "db error" }, { status: 500 });
  }
}
