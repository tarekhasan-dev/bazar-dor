
export async function GET(request) {

    const category = new URL(request.url).searchParams.get("category");

    const urls = [
        "https://api.api-store.workers.dev/api/bazardor/products",
        "https://api.abcz.workers.dev/api/bazardor/products",
    ];

    for (const url of urls) {

        try {

            const endpoint = category
                ? `${url}?category=${encodeURIComponent(category)}`
                : url;

            const response = await fetch(endpoint, {
                cache: "no-store",
            });

            if (!response.ok) {

                continue;

            }

            const data = await response.json();

            return Response.json(data);

        }

        catch {

            continue;

        }

    }

    return Response.json(
        { message: "পণ্যের তথ্য আনা যায়নি। আবার চেষ্টা করুন।" },
        { status: 502 }
    );

}