import { useState } from "react";
import { firebase } from "../../../config/firebase";
import { Button } from "antd";

const Signup: React.FC<{}> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }: any) => {
        alert("アカウント作成成功");
        user
          .updateProfile({ displayName: name })
          .then(() => {
            alert("ユーザーネームを更新しました");
          })
          .catch((err) => {
            console.log(err);
            alert("ユーザーネーム更新失敗");
          });
      });
  };

  return (
    <>
      <h1>Signupページ</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">ユーザー名: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder="メールアドレス"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">メールアドレス: </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="メールアドレス"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">パスワード: </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="パスワード"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">アカウント作成</button>
        <Button type="primary">Button</Button>
      </form>
    </>
  );
};

export default Signup;
