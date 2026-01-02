import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Password from "@/models/password";
import { decrypt, encrypt } from "@/lib/encryption";

export async function POST(req: Request) {


    await connectDB();
    const body = await req.json();

    const encryptedPassword = encrypt(body.password);

    const saved = await Password.create({
        id: body.id,
        website: body.website,
        username: body.username,
        password: encryptedPassword,
    });

    return NextResponse.json({ success: true });
}
export async function GET() {
    await connectDB();
    const items = await Password.find().sort({ createdAt: -1 });

    // decrypt before sending to client
    const result = items.map((i) => ({
        id: i._id.toString(),
        website: i.website,
        username: i.username,
        password: decrypt(i.password),
    }));

    return NextResponse.json(result);
}
export async function DELETE(req: Request) {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id") || "";
    await Password.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
}