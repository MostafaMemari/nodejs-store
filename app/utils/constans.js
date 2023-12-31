module.exports = {
  MongoIDPatern: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
  EXPIRES_IN: new Date().getTime() + 120000,
  ROLES: Object.freeze({
    USER: "USER",
    ADMIN: "ADMIN",
    WRITER: "WRITER",
    TEACHER: "TEACHER",
    SUPPLIER: "SUPPLIER",
  }),
  PERMISSIONS: Object.freeze({
    USER: ["profile"],
    ADMIN: ["all"],
    SUPER_ADMIN: ["all"],
    CONTENT_MANAGER: ["course", "blog", "category", "product"],
    TEACHER: ["course", "blog"],
    SUPPLIER: ["product"],
    ALL: "all",
  }),

  ACCESS_TOKEN_SECRET_KEY: "FB8C7C3E7E353F78CD8F5A158A76880DBEF4342D0BF03F73A316DE399AE4394C",
  REFRESH_TOKEN_SECRET_KEY: "CD78EE3341773649DDC650DD035B9E645CBC3997D36FA79BE8C8A6D88AEEB04B",
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM4ODM2NjUxMCIsImlhdCI6MTY5NzU0ODAxOSwiZXhwIjoxNjk4MTUyODE5fQ.lS9Lj7gaaqlX-W2Eyj4E0QItrfa7focioOe59R6OjYg
