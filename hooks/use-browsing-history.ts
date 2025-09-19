 import { create } from 'zustand'
   import { persist } from 'zustand/middleware'
   type BrowsingHistory = {
     products: { slug: string; category: string }[]
   }
   const initialState: BrowsingHistory = {
     products: [],
   }

   export const browsingHistoryStore = create<BrowsingHistory>()(
     persist(() => initialState, {
       name: 'browsingHistoryStore',
     })
   )

   export default function useBrowsingHistory() {
     const { products } = browsingHistoryStore()
     return {
       products,
       addItem: (product: { slug: string; category: string }) => {
         const index = products.findIndex((p) => p.slug === product.slug)
         if (index !== -1) products.splice(index, 1) // Remove duplicate if it exists
         products.unshift(product) // Add id to the start

         if (products.length > 10) products.pop() // Remove excess items if length exceeds 10

         browsingHistoryStore.setState({
           products,
         })
       },

       clear: () => {
         browsingHistoryStore.setState({
           products: [],
         })
       },
     }
   }