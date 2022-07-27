import ContentLoader from "react-content-loader"

const Skeleton = () => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={500}
        viewBox="0 0 280 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="134" cy="136" r="125" />
        <rect x="0" y="280" rx="15" ry="15" width="280" height="27" />
        <rect x="0" y="330" rx="15" ry="15" width="280" height="88" />
        <rect x="2" y="443" rx="0" ry="0" width="90" height="27" />
        <rect x="126" y="431" rx="31" ry="31" width="152" height="45" />
    </ContentLoader>
)

export default Skeleton