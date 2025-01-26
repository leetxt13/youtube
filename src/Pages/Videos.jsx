import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';

// import FakeYoutube from '../API/fakeYoutube';
// import Youtube from '../API/youtube';
import { useYoutubeApi } from '../context/YoutubeApiContext';
export default function Videos() {
  const { keyWord } = useParams();
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery({
    queryKey: ['videos', keyWord],
    queryFn: () => {
      return youtube.search(keyWord);
    },
    staleTime: 1000 * 60 * 1,
  });
  return (
    <>
      <p className="text-sm line-clamp-3 whitespace-nowrap text-center">
        네가 좀더 유튜브 보자, 손을 모으고 좀더 보자 하니,
        <br />네 빈궁이 강도 같이 오며 네 곤핍이 군사같이 이르리라
        <br />
        (잠 24:33 말씀 응용)
      </p>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong</p>}
      {videos && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-3">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </ul>
      )}
    </>
  );
}
