import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClanInfo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          "/coc/clan/info", {
          id: "%232Y2Y9YCUU"
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        setData(response.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>대기 중...</div>
  }
  if (!data) {
    return null;
  }
  return (
    <div className="clanInfo">
      <span className="clanName">{data.name}</span>
      <img className="clanBadge" src={data.badgeUrls.medium} alt="clanBadge" />
    </div>
  );
};

export default ClanInfo;