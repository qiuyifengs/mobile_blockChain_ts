import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import Home from '@/views/Home.vue'
import Tokens from '@/views/Tokens.vue'

import Blocks from '@/views/Blocks.vue'
import BlockDetail from '@/views/BlockDetail.vue'

import Transactions from '@/views/Transactions.vue'
import TransactionDetail from '@/views/TransactionDetail.vue'
import TxsByBlock from '@/views/TxsByBlock.vue'
import TransactionsByAddress from '@/views/TransactionsByAddress.vue'

import SuperNode from '@/views/SuperNode.vue'
import SuperNodeDetail from '@/views/SuperNodeDetail.vue'

import ContractByAddress from '@/views/ContractByAddress.vue'
import Search from '@/views/Search.vue'
import About from '@/views/About.vue'

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/About',
      name: 'About',
      component: About
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Blocks',
      name: 'Blocks',
      component: Blocks
    },
    {
      path: '/BlockDetail/:id',
      name: 'BlockDetail',
      props: true,
      component: BlockDetail
    },
    {
      path: '/Transactions',
      name: 'Transactions',
      component: Transactions
    },
    {
      path: '/TransactionDetail/:id',
      name: 'TransactionDetail',
      props: true,
      component: TransactionDetail
    },
    {
      path: '/TransactionsByAddress/:id',
      name: 'TransactionsByAddress',
      props: true,
      component: TransactionsByAddress
    },
    {
      path: '/TxsByBlock/:id',
      name: 'TxsByBlock',
      props: true,
      component: TxsByBlock
    },
    {
      path: '/ContractByAddress/:id',
      name: 'ContractByAddress',
      props: true,
      component: ContractByAddress
    },
    {
      path: '/Tokens',
      name: 'Tokens',
      component: Tokens
    },
    {
      path: '/SuperNode',
      name: 'SuperNode',
      component: SuperNode
    },
    {
      path: 'SuperNodeDetail/:id',
      name: 'SuperNodeDetail',
      props: true,
      component: SuperNodeDetail
    }
  ]
});
