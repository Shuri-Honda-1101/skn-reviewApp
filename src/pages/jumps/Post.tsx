import { FC, ChangeEvent, useState } from "react";
import { firebase, db, storage } from "../../../config/firebase";

type PostProps = {};

const Post: FC<PostProps> = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [item, setItem] = useState<string>("");
  const [itemUrl, setItemUrl] = useState<string>("");
  const [evaluation, setEvaluation] = useState<string>("");
  const [maintext, setMainText] = useState<string>("");
  const [imagesUrl, setImagesUrl] = useState<Promise<any>[]>([]);
  const handleImage = (event) => {
    const FileList: FileList = event.target.files;
    const files = Array.from(FileList);
    const images = files.map((file) => {
      return file;
    });
    setFiles(images);
  };

  const add = () => {
    const imagesadd = async () => {
      for (let i = 0; i < files.length; i++) {
        const storageRef = storage.ref().child(`images/${files[i].name}`);
        storageRef
          .put(files[i])
          .then(() => {
            storageRef.getDownloadURL().then((url) => {
              setImagesUrl([...imagesUrl, url]);
              // db.collection("review")
              //   .doc(id)
              //   .update({
              //     imagesURL: [...imagesUrl, url],
              //   });
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    imagesadd().then(() => {
      console.log(imagesUrl);

      const addprocess = db
        .collection("review")
        .add({
          item: item,
          itemUrl: itemUrl,
          evaluation: evaluation,
          content: maintext,
          user: firebase.auth().currentUser.displayName,
          uid: firebase.auth().currentUser.uid,
          time: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL: firebase.auth().currentUser.photoURL,
          imagesURL: imagesUrl,
        })
        .then(() => {
          return "投稿しました";
        })
        .catch(() => {
          return "投稿に失敗しました";
        });
      alert(addprocess);
      if (files.length > 4) {
        alert("画像のアップロードは3枚までです。");
        return;
      }
    });
  };
  // db.collection("review").doc("aaED1LaQMu0szp4Jsyq6").update({
  //   imagesURL: imagesUrl,
  // });

  // console.log(imagesUrl);

  const radio = (e: ChangeEvent<HTMLInputElement>) => {
    setEvaluation(e.target.value);
  };

  return (
    <div>
      <h1>レビューを投稿する</h1>
      <div>
        <p>＞画像を追加</p>
        <input
          type="file"
          accept=".jpeg, .jpg, .png, .gif"
          multiple
          onChange={handleImage}
        />
      </div>
      <div>
        <p>＞商品を登録</p>
        <input type="text" onChange={(e) => setItem(e.target.value)} />
      </div>
      <div>
        <p>＞購入サイトのURL</p>
        <input type="url" onChange={(e) => setItemUrl(e.target.value)} />
      </div>
      <div>
        <p>＞評価</p>
        <input type="radio" name="radio" onChange={radio} value="1" />
        <label>☆1</label>
        <input type="radio" name="radio" onChange={radio} value="2" />
        <label>☆2</label>
        <input type="radio" name="radio" onChange={radio} value="3" />
        <label>☆3</label>
        <input type="radio" name="radio" onChange={radio} value="4" />
        <label>☆4</label>
        <input type="radio" name="radio" onChange={radio} value="5" />
        <label>☆5</label>
      </div>
      <div>
        <p>＞レビュー</p>
        <input type="textarea" onChange={(e) => setMainText(e.target.value)} />
      </div>
      <div>
        <button onClick={add}>投稿する</button>
      </div>
    </div>
  );
};
export default Post;
