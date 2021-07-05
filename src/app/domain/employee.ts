export interface employee {
    //added id for getById request
    id?: number;
    empName: string;
    jobTitle: string;
    status: boolean;
}