"use client"

import { useCollections } from "medusa-react"
import styles from "./ProductSelector.module.css"
import SkeletonCard from "./SkeletonCard";
import CollectionCard from "./CollectionCard";

export default function Collections({setActiveCollection}) {
    const { collections, collectionsLoading } = useCollections()

    return (
        <div className={styles.menu}>
            {(collectionsLoading || (collectionsLoading === undefined && !collections?.length)) && <>
                <SkeletonCard/>
                <SkeletonCard/>
                <SkeletonCard/>
                <SkeletonCard/>
                <SkeletonCard/>
            </>}
            {collections && !collections.length && <span>No Collections</span>}
            {collections && collections.length > 0 && (
                collections.map(collection => {
                    function handleClick() {
                        setActiveCollection(collection)
                    }
                    return <CollectionCard onClick={handleClick} key={collection.id} collection={collection}/>
                })
            )}
        </div>
    )
}