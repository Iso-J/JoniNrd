import React from 'react';
import { useTranslation } from 'react-i18next';

function Post({ post }) {
  const {t: tPost} = useTranslation("post");
  const {t: tGlobal} = useTranslation("global");

  return (
    <div className="post">
      <h2>{tPost("post.title")}</h2>
      <p><i>{tGlobal("blogi.kirjoittanut")} {post.author} {tGlobal("blogi.aika")} {post.date}</i></p>
      <p>{tPost("post.content")}</p>
    </div>
  );
}

export default Post;