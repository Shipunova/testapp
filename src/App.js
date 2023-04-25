import React, { useMemo, useRef, useState } from 'react';
import ClassCounter from './components/ClassCounter';
import Counter from './components/Counter';
import './styles/app.css';
import PostItem from './components/PostItem';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';
import PostForm from './components/PostForm'
import MySelect from './components/UI/select/MySelect';

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'Ааааа', body: 'Ккккк'},
    {id: 2, title: 'Мммм', body: 'Хахаха'},
    {id: 3, title: 'Яяяя', body: 'Дддд'},
    {id: 4, title: 'Вввв', body: 'Рррр'},
  ])
  
  const [selectedSort, setSelectedSort] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const sortedPosts = useMemo(() => {
    console.log('Отработало Ура!');
    if(selectedSort) {
      return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
    }
    return posts;
  }, [selectedSort, posts])

  const sortedAndSearhedPosts =useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(searchQuery))
  }, [searchQuery, sortedPosts])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const sortPosts = (sort) => {
    setSelectedSort(sort);
  }

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{margin: '15px 0'}}></hr>
      <div>
        <MyInput 
          value={searchQuery}
          onChange= {e => setSearchQuery(e.target.value)}
          placeholder="Поиск"/>
        <MySelect
        value={selectedSort}
        onChange = {sortPosts}
        defaultValue= "Сортировка"
        options={[
          {value: 'title', name: 'По названию'},
          {value: 'body', name: 'По описанию'},
        ]}
        />
      </div>
      {sortedAndSearhedPosts.length !== 0
      ? <PostList remove={removePost} posts={sortedAndSearhedPosts} title="Посты про JS"/>
      : <h1 style={{textAlign: 'center', color: 'teal'}}>Пусто!</h1>
    }
      
    </div>
  );
  };

export default App;
