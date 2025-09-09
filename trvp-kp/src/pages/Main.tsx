import {Card, CardContent, Chip, Stack, Typography} from "@mui/joy";
import {articlesMock} from "../entities/article";
import { useNavigate } from "react-router";

const Main = () => {
    const navigate = useNavigate();
    return (
        <Stack spacing={2} sx={{ maxWidth: 900, mx: "auto", px: 2 }}>
            <Typography level="h2">Статьи</Typography>
            {articlesMock.map((a) => (
                <Card
                    key={a.id}
                    variant="outlined"
                    onClick={() => navigate(`/article/${a.id}`)}
                    sx={{
                        cursor: "pointer",
                        transition: "transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease",
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: 'sm',
                            borderColor: 'primary.solidBg',
                        },
                        '&:active': {
                            transform: 'translateY(-1px)'
                        }
                    }}
                >
                    <CardContent>
                        <Stack spacing={1}>
                            <Typography level="h3">{a.title}</Typography>
                            <Typography level="body-sm" color="neutral">
                                Автор: {a.author} · {new Date(a.createdAt).toLocaleDateString()} {a.readingTimeMin ? `· ${a.readingTimeMin} мин` : ""}
                            </Typography>
                            <Typography level="body-md" sx={{
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}>
                                {a.text}
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap">
                                {a.tags.map((t) => (
                                    <Chip key={t} variant="soft" size="sm">{t}</Chip>
                                ))}
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            ))}
        </Stack>
    );
};

export default Main;