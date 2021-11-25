const connection = require('../app/database');

class CommentService {
  async create(momentId, content, userId) {
    const statement = `INSERT INTO comment (moment_id, content, user_id) VALUES (?, ?, ?);`;
    const [result] = await connection.execute(statement, [momentId, content, userId]);
    // console.log(result);
    return result;
  }

  async reply(momentId, content, commentId, userId) {
    const statement = `INSERT INTO comment (moment_id, content, comment_id, user_id) VALUES (?, ?, ?, ?);`;
    const [result] = await connection.execute(statement, [momentId, content, commentId, userId]);
    // console.log(result);
    return result;
  }

  async update(commentId, content) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [content, commentId]);
    return result;
  }

  async remove(commentId) {
    const statement = `DELETE FROM comment WHERE id = ?;`;
    const [result] = await connection.execute(statement, [commentId]);
    return result;
  }

  // 分成两个接口获取(另一种做法是在moment.service.js的31行)
  async getCommentsByMomentId(momentId) {
    const statement =  `
      SELECT
        m.id, m.content, m.comment_id commentId,
        JSON_OBJECT('id', u.id, 'name', u.name) user
      FROM comment m
      LEFT JOIN user u ON u.id = m.user_id
      WHERE moment_id = ?;
    `;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }
};

module.exports = new CommentService();