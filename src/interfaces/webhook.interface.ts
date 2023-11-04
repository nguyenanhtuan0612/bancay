// export interface ICassoNewPaymentData {
//     id: number; //mã định danh duy nhất của giao dịch (Casso quy định)
//     tid: string; //Mã giao dịch từ phía ngân hàng
//     description: string; // nội dung giao dịch
//     amount: number; // số tiền giao dịch
//     cusum_balance: number; // số tiền còn lại sau giao dịch
//     when: Date; // thời gian ghi có giao dịch ở ngân hàng
//     bank_sub_acc_id: string; // Mã tài khoản ngân hàng mà giao dịch thuộc về
//     subAccId: string; // tương tự field bank_sub_acc_id, nhằm tương thích với code cũ.
//     virtualAccount: string; // tài khoản ảo
//     virtualAccountName: string; // tên tài khoản ảo
//     corresponsiveName: string; // tên tài khoản đối ứng
//     corresponsiveAccount: string; // tài khoản đối ứng
//     corresponsiveBankId: string; // mã ngân hàng đối ứng
//     corresponsiveBankName: string; // tên ngân hàng đối ứng
// }

// export interface ICassoPaymentHookData {
//     error: number;
//     data: ICassoNewPaymentData[];
// }
