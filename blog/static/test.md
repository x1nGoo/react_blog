```
Home.getInitialProps = async () => {
  const res = await axios(servicePath.getArticleList);
  return { list: res.data.data }
}
```