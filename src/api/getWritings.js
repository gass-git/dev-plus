import axios from "axios";

let posts_api = "https://blog.gass.dev/api/posts";

function getWritings({setPosts, setLastPost}){
    let newArray = [];

    axios.get(posts_api)
    .then((resp) => {
        resp.data.forEach((post) => {
          newArray.push({
            'id' : post.id,
            'title' : post.title,
            'created_at' : post.created_at,
            'views' : post.views
          });
        });

        let sortedArr = newArray.sort((a, b) => {return b.id - a.id});
        setPosts(sortedArr);
        setLastPost(sortedArr[0]);
      });
}

export default getWritings;