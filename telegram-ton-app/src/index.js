const { Telegraf } = require('telegraf');
const { TonClient, abiContract } = require('@ton-client/core');
const { libNode } = require('@ton-client/lib-node');
TonClient.useBinaryLibrary(libNode);

const bot = new Telegraf('YOUR_TELEGRAM_BOT_TOKEN');

// Инициализация TON клиента
const client = new TonClient({
    network: {
        server_address: 'https://main.ton.dev',
    },
});

// ABI вашего смарт-контракта
const helloWorldAbi = {
    // Скопируйте ABI из скомпилированного контракта
};

async function callSmartContract() {
    const account = {
        address: 'YOUR_CONTRACT_ADDRESS',
        abi: abiContract(helloWorldAbi),
    };
    const result = await client.net.query_collection({
        collection: 'accounts',
        filter: { id: { eq: account.address } },
        result: 'balance',
    });
    return result;
}

bot.start((ctx) => ctx.reply('Welcome to the TON Telegram bot!'));

bot.command('getmessage', async (ctx) => {
    try {
        const message = await callSmartContract();
        ctx.reply(`Current message: ${message}`);
    } catch (error) {
        console.error(error);
        ctx.reply('Error fetching message from the contract.');
    }
});

bot.launch();
