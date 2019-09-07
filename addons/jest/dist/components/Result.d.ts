export declare const FailedResult: any;
interface ResultProps {
    fullName?: string;
    title?: string;
    status: string;
}
declare const Result: {
    ({ fullName, title, status }: ResultProps): JSX.Element;
    defaultProps: {
        fullName: string;
        title: string;
    };
};
export default Result;
