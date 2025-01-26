import React, { useEffect, useState } from 'react';
import { FaYoutube } from 'react-icons/fa';
import { BsSearch } from 'react-icons/bs';
import { Link, useNavigate, useParams } from 'react-router-dom';
export default function SearchHeader() {
  const [text, setText] = useState('');
  const { keyWord } = useParams();
  const navigater = useNavigate();
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setText('');
    navigater(`/videos/${text}`);
  };
  useEffect(() => setText(keyWord || ''), [keyWord]);
  return (
    <header className="w-full flex p-4 text-2xl border-b border-zinc-600 mb-4">
      <Link to="/" className="flex items-center">
        <FaYoutube className="text-brand text-4xl" />
        <h1 className="font-bold ml-2 text-3xl">LTYTUBE</h1>
      </Link>
      <form onSubmit={handleSubmit} className="w-full flex justify-center">
        <input
          className="w-7/12 p-2 outline-none bg-black"
          type="text"
          value={text}
          placeholder="검색하고자 하는 내용을 입력하세요"
          onChange={handleChange}
        />
        <button className="bg-zinc-600 px-4">
          <BsSearch />
        </button>
      </form>
    </header>
  );
}
