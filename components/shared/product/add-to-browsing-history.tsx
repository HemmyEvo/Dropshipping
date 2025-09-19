   'use client'
   import useBrowsingHistory from '@/hooks/use-browsing-history'
   import { useEffect } from 'react'

   export default function AddToBrowsingHistory({
     slug,
     category,
   }: {
     slug: string
     category: string
   }) {
     const { addItem } = useBrowsingHistory()
     useEffect(() => {
       console.log('addItem({ id, category })')
       addItem({ slug, category })
       // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [])
     return null
   }