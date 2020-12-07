const getMenu = (req, res) => {
  res.json(
    [{"id":6,"name":"思泉语文·初中"},{"id":7,"name":"高斯数学·初中"},{"id":11,"name":"元本物理·初中"},{"id":13,"name":"点燃化学·初中"},{"id":21,"name":"思高英语·小学"},{"id":22,"name":"高斯数学·小学"},{"id":23,"name":"思泉语文·小学"},{"id":30,"name":"高斯数学·高中"},{"id":31,"name":"点燃化学·高中"},{"id":32,"name":"元本物理·高中"},{"id":33,"name":"显微生物-高中"},{"id":34,"name":"思高英语·初中"},{"id":35,"name":"思高英语·高中"},{"id":46,"name":"思泉语文·高中"},{"id":100,"name":"初中科学"}]
  )
}
export default {
  'GET /subject': getMenu,
};
