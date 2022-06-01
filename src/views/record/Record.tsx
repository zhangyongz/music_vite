import React, { useCallback, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { Spin } from "antd";

import { userRecord } from "@/commons/api";
import { selectUid, setTracks } from "@/store/features/users/usersSlice";
import List from "@/components/list/List";
import "./record.less";
import PlayBtn from "@/components/play-btn/PlayBtn";

const Record: React.FC = () => {
  const uid = useAppSelector(selectUid);
  const [listData, setListData] = useState([]);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false); 

  const getRecordList = useCallback(async () => {
    if (!uid) {
      return;
    }
    setLoading(true);
    const { code, weekData } = await userRecord({
      uid,
      type: "1"
    });
    setLoading(false);
    if (code === 200) {
      // console.log(weekData);
      weekData.forEach((item: any) => {
        for (const key in item.song) {
          item[key] = item.song[key];
        }
      });
      setListData(weekData);
    }
  }, [uid]);

  useEffect(() => {
    getRecordList();
  }, [getRecordList]);

  const handleClick = useCallback(() => {
    dispatch(setTracks(listData));
  }, [listData, dispatch]);

  return (
    <div className="record_box">
      <Spin spinning={loading}>
        <p className="total_text">共{listData.length}首</p>
        <PlayBtn className="paly_btn" onClick={handleClick}></PlayBtn>
        <List data={listData}></List>
      </Spin>
    </div>
  );
};

export default Record;