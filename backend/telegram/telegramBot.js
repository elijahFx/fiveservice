// backend/telegramBot.js
const TelegramBot = require('node-telegram-bot-api');

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

class TelegramNotifier {
  constructor(token) {
    this.bot = new TelegramBot(token, {polling: true});
    this.adminChatIds = process.env.ADMIN_CHAT_IDS.split(',');
    console.log(this.bot, this.adminChatIds);
    
    // Добавляем обработчик для получения ID
    this.bot.onText(/\/myid/, (msg) => {
      const chatId = msg.chat.id;
      const userInfo = msg.from;
      
      const userDetails = `
📋 Ваш Chat ID: \`${chatId}\`

👤 Имя: ${userInfo.first_name}
📛 Фамилия: ${userInfo.last_name || 'Не указана'}
🔗 Username: ${userInfo.username ? `@${userInfo.username}` : 'Не указан'}

Сообщите этот ID администратору для добавления в список уведомлений.
      `;
      
      this.bot.sendMessage(chatId, userDetails, {
        parse_mode: 'Markdown'
      });
      
      // Лог в консоль
      console.log('=== ЗАПРОС ID ===');
      console.log('Chat ID:', chatId);
      console.log('User:', userInfo.first_name, userInfo.last_name);
      console.log('Username:', userInfo.username);
      console.log('=================');
    });

    // Просто отвечаем на любое сообщение ID
    this.bot.on('message', (msg) => {
      // Игнорируем команды которые уже обрабатываются
      if (msg.text && msg.text.startsWith('/')) return;
      
      const chatId = msg.chat.id;
      this.bot.sendMessage(chatId, 
        `Ваш Chat ID: \`${chatId}\`\n\nИспользуйте /myid для подробной информации`,
        { parse_mode: 'Markdown' }
      );
    });
  }

  async sendOrderNotification(orderData) {
    try {
      const isUrgent = this.checkUrgency(orderData.content);
      const message = this.formatOrderMessage(orderData, isUrgent);
      const keyboard = this.formatOrderKeyboard(orderData, isUrgent);
      
      for (const chatId of this.adminChatIds) {
        try {
          await this.bot.sendMessage(chatId, message, {
            reply_markup: keyboard,
            parse_mode: 'Markdown'
          });
        } catch (error) {
          console.error(`Failed to send to ${chatId}:`, error.message);
        }
      }
    } catch (error) {
      console.error('Telegram notification error:', error);
    }
  }

  checkUrgency(content) {
    if (!content) return false;
    const urgentKeywords = ['срочно', 'СРОЧНО'];
    return urgentKeywords.some(keyword => content.includes(keyword));
  }

  formatOrderMessage(order, isUrgent = false) {
    const urgencyPrefix = isUrgent ? '🚨🚨🚨 СРОЧНАЯ ЗАЯВКА! 🚨🚨🚨\n\n' : '';
    
    return `${urgencyPrefix}🎯 Новая заявка с сайта!

👤 Клиент: ${order.name}
📞 Телефон: ${order.phone}
🛍️ Проблема: ${order.content || 'Проблема не указана'}
📅 Дата обращения: ${formatDate(order.createdAt)}

🆔 ID заявки: #${order.id}
${isUrgent ? '\n⚠️ *Требуется срочный ответ!* ⚠️' : ''}`;
  }

  formatOrderKeyboard(order, isUrgent = false) {
    const buttonText = isUrgent ? '🚨 СРОЧНО! Просмотр заявки' : '📋 Просмотр';
    
    return {
      inline_keyboard: [
        [
          {
            text: buttonText,
            url: `https://testend.site/admin/claims/${order.id}`
          }
        ]
      ]
    };
  }
}

module.exports = TelegramNotifier;