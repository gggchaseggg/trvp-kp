import {Breadcrumbs, Button, Card, CardContent, Chip, Divider, Sheet, Stack, Typography} from "@mui/joy";
import {Link, useParams} from "react-router";
import type {Article} from "../entities/article";
import {useEffect, useState} from "react";
import axios from "axios";
import {type ICreatePayment, YooCheckout} from "@a2seven/yoo-checkout";

const checkout = new YooCheckout({shopId: '1164949', secretKey: 'test_twt-tHvJHlRW-U_qSZdMS05v2wBdVTPROdu3h0yOdzA\n'});


const Article = () => {
  const {id} = useParams();
  const [article, setArticle] = useState<Article | null>(null)

  useEffect(() => {
    axios.get<Article>(`http://localhost:3000/articles/${id}`).then((value) => setArticle(value.data))
  }, []);

  if (!article) {
    return (
      <Stack sx={{maxWidth: 900, mx: "auto", px: 2}} spacing={1}>
        <Typography level="h3">Статья не найдена</Typography>
        <Typography level="body-md" color="neutral">
          К сожалению, статья с указанным идентификатором отсутствует.
        </Typography>
        <Typography level="body-sm"><Link to="/">Вернуться на главную</Link></Typography>
      </Stack>
    );
  }

  const handleDonate = async () => {
    const createPayload: ICreatePayment = {
      amount: {
        value: '2.00',
        currency: 'RUB'
      },
      payment_method_data: {
        type: 'bank_card'
      },
      confirmation: {
        type: 'redirect',
        return_url: 'test'
      }
    };

    const idempotenceKey = '02347fc4-a1f0-49db-807e-f0d67c2ed5a5';

    try {
      const payment = await checkout.createPayment(createPayload, idempotenceKey);
      console.log(payment)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Stack spacing={3} sx={{maxWidth: 980, mx: "auto", px: 2}}>
      <Breadcrumbs size="sm">
        <Link to="/">Главная</Link>
        <Link to="/">Статьи</Link>
        <Typography color="neutral">{article.title}</Typography>
      </Breadcrumbs>
      <Sheet
        variant="solid"
        color="primary"
        sx={{
          borderRadius: 12,
          p: {xs: 2, sm: 3},
          pt: {xs: 3, sm: 4},
        }}
      >
        <Stack spacing={1}>
          <Typography level="h1" sx={{color: "#fff"}}>
            {article.title}
            <Button variant={'soft'} sx={{marginLeft: 10}} color={'warning'} onClick={handleDonate}>Донат</Button>
          </Typography>
          <Typography level="body-sm" sx={{color: "#e6f0ff"}}>
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

      <Card variant="soft" sx={{p: {xs: 1, sm: 2}}}>
        <CardContent>
          <Stack spacing={2}>
            {article.imageUrl && (
              <img
                alt=""
                src={article.imageUrl}
                style={{width: "100%", height: "auto", borderRadius: 12}}
              />
            )}

            <Divider/>

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