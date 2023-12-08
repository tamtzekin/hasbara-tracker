// import logo from './logo.svg';
// import './App.css';

// import React, { useState, useEffect } from 'react';
// import { NotionAPI } from 'notion-client';
// import { NotionRenderer } from 'react-notion-x';

// const NotionPage = () => {
//   const [notionData, setNotionData] = useState(null);

//   useEffect(() => {
//     const fetchNotionData = async () => {
//       const pageId = '7b7f063709034186adbfb46f455d5065';
//       const api = new NotionAPI();
//       const recordMap = await api.getPage(pageId);
//       setNotionData(recordMap);
//     };

//     fetchNotionData();
//   }, []);

//   return (
//     <div>
//       {notionData ? (
//         <NotionRenderer recordMap={notionData} />
//       ) : (
//         <p>Loading Notion page...</p>
//       )}
//     </div>
//   );
// };

// export default NotionPage;
