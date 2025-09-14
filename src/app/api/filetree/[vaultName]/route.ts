import { TreeNode } from "@/components/FileTree";
import { generateFolderStructure } from "@/app/lib/notes";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ vaultName: string }> }) {
    const { vaultName } = await params

    // if vault name is not provided, return 400
    if (!vaultName) {
        return NextResponse.json({ error: 'vaultName query parameter is required' }, { status: 400 });
    }

    const treeData: TreeNode = await generateFolderStructure(vaultName);

    return NextResponse.json(treeData, {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}