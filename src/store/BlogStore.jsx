import { createContext } from 'react';

const blogContext = createContext({});

const BlogListProvider = ({ children }) => {
  return <blogContext.Provider value={[]}>{children}</blogContext.Provider>;
};
export default BlogListProvider;
