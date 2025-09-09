import { Button, Card, FormControl, FormLabel, Input, Stack, Textarea, Typography } from "@mui/joy";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { userStore } from "../stores/userStore";
import { Navigate } from "react-router";
import { parseTags } from "../shared/text";

const CreateArticle = observer(() => {
  const { user } = userStore;

  const isWriter = !!user && user.role === "writer";

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState("");

  if (!isWriter) {
    return <Navigate to="/login" replace />;
  }

  const handlePublish = () => {
    const payload = {
      title,
      text,
      tags: parseTags(tags),
    };
    console.log("Create article payload:", payload);
  };

  return (
    <Stack sx={{ maxWidth: 800, mx: "auto", px: 2 }} spacing={2}>
      <Typography level="h2">Новая статья</Typography>
      <Card>
        <Stack spacing={2}>
          <FormControl>
            <FormLabel>Заголовок</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Например: Как я настроил MobX в проекте"
              size="lg"
              variant="soft"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Текст статьи</FormLabel>
            <Textarea
              minRows={8}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Введите содержимое статьи..."
              variant="soft"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Теги (через запятую)</FormLabel>
            <Input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="react, hooks, mobx"
              variant="soft"
            />
          </FormControl>

          <Button onClick={handlePublish} disabled={!title || !text}>
            Опубликовать
          </Button>
        </Stack>
      </Card>
    </Stack>
  );
});

export default CreateArticle;
