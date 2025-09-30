const express = require('express');
const router = express.Router();
const {
  addClaim,
  getClaims,
  updateClaim,
  deleteClaim,
  getClaimById
} = require('../controllers/claimsControllers');

router.get('/:id', getClaimById)
// Получить до 100 последних заявок
router.get('/', getClaims);

// Добавить заявку
router.post('/', addClaim);

// Редактировать заявку
router.patch('/:id', updateClaim);

// Удалить заявку
router.delete('/:id', deleteClaim);

module.exports = router;