class RTMsg {
  constructor(url = undefined, recv) {
    if (!url) return;

    this.url = url;

    this.subs = [];

    if (recv) {
      this.subs.push(recv);
    }
    this.socket = new WebSocket(this.url);
    this.timer = undefined;
    this.timeout = 6;
    this.readyState = -1;
    this._init(this.socket);
    this.isActive = false; // 手动关闭

    // 上次发送失败的数据
    this.buf = [];
    //this.hasClosed = false //关闭状态
  }

  _init = socket => {
    socket.onclose = this._onclose;
    socket.onmessage = this._onmessage;
    socket.onopen = this._onopen;
    socket.onerror = this._onerror;
  };

  _onclose = event => {
    console.log("WS closed: %o", event);
    this.hasClosed = true;

    if (!this.isActive) {
      this._reconnect();
    }
  };

  _reconnect = () => {
    if (this.timer) return;
    this.timer = setInterval(() => {
      this.socket = new WebSocket(this.url);
      if (this.socket) {
        this._init(this.socket);
        clearInterval(this.timer);
        this.timer = undefined;
      }
    }, 1000 * this.timeout);
  };

  _onerror = event => {
    this._reconnect();
  };

  // _resend() {
  //   for
  // }

  _onmessage = event => {
    if (this.isActive) return;
    this.subs.map(callback => {
      callback(event.data);
    });
  };

  _onopen = event => {
    console.log("wesocket开启了吗:%o");
  };

  send = msg => {
    return this.socket.send(msg);
  };

  close = () => {
    console.log("close ws");
    this.socket.close();
    this.socket = undefined;
    this.isActive = true;
  };

  setRecvCallback = callback => {
    this.subs.push(callback);
    return this.subs.length - 1;
  };

  rmRecvCallback = id => {
    if (this.subs.length === 0) return;

    this.subs.splice(id, 1);
  };

  setOpenMsg = callback => {
    this.openMsg = callback;
  };
}

// export const close()

export let WSInstance = undefined;

export const sendMsg = data => {
  if (WSInstance) {
    WSInstance.send(JSON.stringify(data));
    return true;
  } else {
    return false;
  }
};

export const closeWS = () => {
  if (WSInstance) {
    WSInstance.close();
    WSInstance = undefined;
  }
};

export const wsInit = (url, recv) => {
  console.log("url: %o", url);
  if (!url) return undefined;

  if (!WSInstance) WSInstance = new RTMsg(url, recv);

  return WSInstance;
};

export const wsSetRecvCallback = function(cb) {
  if (!WSInstance) return;
  return WSInstance.setRecvCallback(cb);
};

export const wsRMRecvCallback = function(id) {
  if (!WSInstance) return;
  WSInstance.rmRecvCallback(id);
};

export const wsKey = function(username) {
  let timestamp = new Date().getTime();
  return `${username}/${timestamp}`;
};
