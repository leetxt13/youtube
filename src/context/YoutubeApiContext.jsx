import { createContext, useContext } from 'react';
import Youtube from '../API/youtube';
import YoutubeClient from '../API/youtubeClient';

// import FakeYoutube from '../API/fakeYoutube';

export const YoutubeApiContext = createContext();
const cilent = new YoutubeClient();
const youtube = new Youtube(cilent); // new FakeYoutube() 로 하면 mock data를 활용하도록 사용가능
export function YoutubeApiProvider({ children }) {
  return (
    <YoutubeApiContext.Provider value={{ youtube }}>
      {children}
    </YoutubeApiContext.Provider>
  );
}

export function useYoutubeApi() {
  return useContext(YoutubeApiContext);
}
