import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import flv from "flv.js";
import { fetchStream } from "../../actions";

const StreamShow = ({ fetchStream, match, stream }) => {
  let videoRef = useRef(null);
  let player;

  useEffect(() => {
    const { id } = match.params;
    fetchStream(id);
    buildPlayer();

    return player && player.destroy();
  }, [fetchStream, match]);

  useEffect(() => {
    buildPlayer();
  }, [stream]);

  const buildPlayer = () => {
    const { id } = match.params;
    if (player || !stream) return;
    player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`,
    });

    player.attachMediaElement(videoRef.current);
    player.load();
  };

  return !stream ? (
    <div>Loading</div>
  ) : (
    <div>
      <video ref={videoRef} style={{ width: "100%" }} controls={true} />
      <h1>{stream.title}</h1>
      <h5>{stream.description}</h5>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
