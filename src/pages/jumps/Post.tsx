import { FC, ChangeEvent, useState } from 'react';
import { firebase, db } from "../../../config/firebase";

type PostProps = {

}

const Post: FC<PostProps> = () => {
  const [file, setfile] = useState<string>('');
  const [item, setItem] = useState<string>('');
  const [itemUrl, setItemUrl] = useState<string>('');
  const [evaluation, setEvaluation] = useState<string>('');
  const [maintext, setMainText] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  const add = () => {
    db.collection('review').add({
      file: file,
      item: item,
      itemUrl: itemUrl,
      evaluation: evaluation,
      content: maintext,
      user: firebase.auth().currentUser.displayName,
    })
    setUserName(firebase.auth().currentUser.displayName)
    alert("投稿しました。");
  }

  const radio = (e: ChangeEvent<HTMLInputElement>) => {
    setEvaluation(e.target.value);
  } 
  return (
    <div>
        <h1>レビューを投稿する</h1>
      <div>
        <p>＞画像を追加</p>
        <input 
          type="file"
          onChange={(e)=>setfile(e.target.value)}
        />
      </div>
      <div>

        <p>＞商品を登録</p>
        <input 
          type="text"
          onChange={(e)=>setItem(e.target.value)} 
        />
      </div>
      <div>
        <p>＞購入サイトのURL</p>
        <input 
          type="url" 
          onChange={(e)=>setItemUrl(e.target.value)}
        />
      </div>
      <div>
        <p>＞評価</p>
        <input 
          type="radio" 
          name="radio"
          onChange={radio}
          value='1' 
        />
        <label>☆1</label>
        <input 
          type="radio" 
          name="radio"
          onChange={radio}
          value='2'
        />
        <label>☆2</label>
        <input 
          type="radio" 
          name="radio"
          onChange={radio}
          value='3'
        />
        <label>☆3</label>
        <input 
          type="radio" 
          name="radio" 
          onChange={radio}
          value='4'
        />
        <label>☆4</label>
        <input 
          type="radio" 
          name="radio" 
          onChange={radio}
          value='5'
        />
        <label>☆5</label>
      </div>
      <div>
        <p>＞レビュー</p>
        <input 
          type="textarea" 
          onChange={(e)=>setMainText(e.target.value)}
        />
      </div>
      <div>
        <button onClick={add}>投稿する</button>
      </div>
    </div>
  )
}
export default Post;