
export async function GET() {
    const urls = [
        "https://api.api-store.workers.dev/api/bazardor/categories",
        "https://api.abcz.workers.dev/api/bazardor/categories",
    ];

    for (const url of urls) {
        try {
            const response = await fetch(url, {
                cache: "no-store",
            });

            if (!response.ok) {
                continue;
            }

            const data = await response.json();

            return Response.json(data);
        } catch {
            continue;
        }
    }

    return Response.json(
        { message: "ক্যাটাগরির তথ্য আনা যায়নি।" },
        { status: 502 }
    );
}