module.exports = {
  MongoIDPatern: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
  EXPIRES_IN: new Date().getTime() + 120000,
  ROLES: {
    USER: "USER",
    ADMIN: "ADMIN",
    WRITER: "WRITER",
    TEACHER: "TEACHER",
    SUPPLIER: "SUPPLIER",
  },
  ACCESS_TOKEN_SECRET_KEY: "FB8C7C3E7E353F78CD8F5A158A76880DBEF4342D0BF03F73A316DE399AE4394C",
  REFRESH_TOKEN_SECRET_KEY: "CD78EE3341773649DDC650DD035B9E645CBC3997D36FA79BE8C8A6D88AEEB04B",
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM4ODM2NjUxMCIsImlhdCI6MTY5Njk0Mjg4NCwiZXhwIjoxNjk3NTQ3Njg0fQ.Bp2DXk_8HYUZKQD8Vf2FjgkRggo805fshISsjoGMWgk
