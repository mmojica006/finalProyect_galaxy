import { LoaderProps } from '../Types/LoaderProps';

const Loader = (props: LoaderProps) => {
    return (
        <>{props.showLoading ? <div className="loader">
            <div className="loading"></div>
        </div> : ''}

        </>
    );
};

export default Loader;
