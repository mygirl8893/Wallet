'use strict';
angular.module('copayApp.services').factory('bitcoincomService', function(gettextCatalog, nextStepsService, platformInfo) {
  var root = {};
  var credentials = {};

  /*
   * Development: 'testnet'
   * Production: 'livenet'
   */      
  var os = platformInfo.isAndroid ? 'android' : platformInfo.isIOS ? 'ios' : 'desktop';
  credentials.NETWORK = 'livenet';
  //credentials.NETWORK = 'testnet';

  if (credentials.NETWORK == 'testnet') {
    credentials.BITPAY_API_URL = "https://test.bitpay.com";
  } else {
    credentials.BITPAY_API_URL = "https://bitpay.com";
  };

  var cashGamesItem = {
    name: 'games',
    title: gettextCatalog.getString('Bitcoin Cash Games'),
    icon: 'icon-games',
    href: 'https://cashgames.bitcoin.com'
  };

  var newsItem = {
    name: 'news',
    title: gettextCatalog.getString('News'),
    icon: 'icon-news',
    href: 'https://news.bitcoin.com/?utm_source=WalletApp&utm_medium=' + os + '&utm_campaign=News'
  };

  var poolItem = {
    name: 'pool',
    title: gettextCatalog.getString('Mining Pool'),
    icon: 'icon-mining',
    href: 'https://pool.bitcoin.com/?utm_source=WalletApp&utm_medium=' + os + '&utm_campaign=Pool'
  };

  var toolsItem = {
    name: 'tools',
    title: gettextCatalog.getString('Tools'),
    icon: 'icon-tools',
    href: 'https://tools.bitcoin.com/?utm_source=WalletApp&utm_medium=' + os + '&utm_campaign=Tools'
  };

  var priceChartItem = {
    name: 'pricechart',
    title: gettextCatalog.getString('Bitcoin Price Charts'),
    icon: 'icon-chart',
    sref: 'tabs.pricechart',
  };

  var faucetItem = {
    name: 'faucet',
    title: gettextCatalog.getString('Free Bitcoin Cash'),
    icon: 'icon-faucet',
    href: 'https://free.bitcoin.com/?utm_source=WalletApp&utm_medium=' + os + '&utm_campaign=Faucet'
  };

  var _getBitPay = function(endpoint) {
    return {
      method: 'GET',
      url: credentials.BITPAY_API_URL + endpoint,
      headers: {
        'content-type': 'application/json'
      }
    };
  };

  var _postBitPay = function(endpoint, data) {
    return {
      method: 'POST',
      url: credentials.BITPAY_API_URL + endpoint,
      headers: {
        'content-type': 'application/json'
      },
      data: data
    };
  };

  root.getNetwork = function() {
    return credentials.NETWORK;
  };

  var register = function() {
    if (!platformInfo.isAndroid) { // To comply with Google Play policies
      nextStepsService.register(cashGamesItem);
    }
    nextStepsService.register(newsItem);
    nextStepsService.register(poolItem);
    nextStepsService.register(toolsItem);
    nextStepsService.register(priceChartItem);
    nextStepsService.register(faucetItem);
  };

  register();
  return root;
});
