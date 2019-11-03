var o = {
    port: "5757",
    rootPathname: "",
  appId: "wxf02838000bc27c0d",
  appSecret: "3539ad038af01bc4d741331da4707384",
    useQcloudLogin: true,
    mysql: {
        host: "localhost",
        port: 3306,
        user: "root",
        db: "zhengjiayuan",
      pass: "wxf02838000bc27c0d",
        char: "utf8mb4"
    },
    cos: {
        region: "ap-qingdao",
        fileBucket: "qcloudtest",
        uploadFolder: ""
    },
    wxLoginExpires: 7200,
    wxMessageToken: "abcdefgh"
};

module.exports = o;