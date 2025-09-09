import { Breadcrumbs, Card, CardContent, Chip, Divider, Sheet, Stack, Typography } from "@mui/joy";
import { useParams, Link } from "react-router";
import { articlesMock } from "../entities/article";

const Article = () => {
    const { id } = useParams();
    const article = articlesMock.find((a) => a.id === id);

    if (!article) {
        return (
            <Stack sx={{ maxWidth: 900, mx: "auto", px: 2 }} spacing={1}>
                <Typography level="h3">Статья не найдена</Typography>
                <Typography level="body-md" color="neutral">
                    К сожалению, статья с указанным идентификатором отсутствует.
                </Typography>
                <Typography level="body-sm"><Link to="/">Вернуться на главную</Link></Typography>
            </Stack>
        );
    }

    return (
        <Stack spacing={3} sx={{ maxWidth: 980, mx: "auto", px: 2 }}>
            <Breadcrumbs size="sm">
                <Link to="/">Главная</Link>
                <Link to="/">Статьи</Link>
                <Typography color="neutral">{article.title}</Typography>
            </Breadcrumbs>
            {/* Hero section with distinct background */}
            <Sheet
                variant="solid"
                color="primary"
                sx={{
                    borderRadius: 12,
                    p: { xs: 2, sm: 3 },
                    pt: { xs: 3, sm: 4 },
                }}
            >
                <Stack spacing={1}>
                    <Typography level="h1" sx={{ color: "#fff" }}>
                        {article.title}
                    </Typography>
                    <Typography level="body-sm" sx={{ color: "#e6f0ff" }}>
                        Автор: {article.author} · {new Date(article.createdAt).toLocaleDateString()} {article.readingTimeMin ? `· ${article.readingTimeMin} мин` : ""}
                    </Typography>
                    {article.tags.length > 0 && (
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                            {article.tags.map((t) => (
                                <Chip key={t} variant="soft" color="neutral" size="sm">
                                    {t}
                                </Chip>
                            ))}
                        </Stack>
                    )}
                </Stack>
            </Sheet>

            {/* Content section visually different from list cards */}
            <Card variant="soft" sx={{ p: { xs: 1, sm: 2 } }}>
                <CardContent>
                    <Stack spacing={2}>
                        {article.imageUrl && (
                            <img
                                alt=""
                                src={article.imageUrl}
                                style={{ width: "100%", height: "auto", borderRadius: 12 }}
                            />
                        )}

                        <Divider />

                        <Typography level="body-lg">
                            {article.text}
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        </Stack>
    );
};

export default Article;