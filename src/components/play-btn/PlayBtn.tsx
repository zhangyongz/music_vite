/* eslint-disable react/jsx-no-duplicate-props */
import React from "react";
import { PlayCircleFilled } from "@ant-design/icons";

import "./playBtn.less";

interface PlayBtnProps {
  className?: string,
  onClick: () => void
}

const PlayBtn: React.FC<PlayBtnProps> = ({className, onClick}) => {
  return (
    <div className={"play_btn_box " + className} onClick={onClick}>
      <PlayCircleFilled style={{color: "#fff", fontSize: "18px"}} />
      <p className="btn_text">播放全部</p>
    </div>
  );
};

export default PlayBtn;