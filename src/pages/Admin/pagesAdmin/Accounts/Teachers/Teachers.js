import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import { faClose, faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import style from './Teachers.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const cx = classNames.bind(style);
function Teachers() {
    const [teachers, setTeachers] = useState([]);
    const [stateAddForm, setStateAddForm] = useState(0);
    const [stateForm, setStateForm] = useState(0);
    const [idUpdate, setIdUpdate] = useState(0);
    const [formData, setFormData] = useState({
        idAccount: '',
        id_transaction_history: '',
        name: '',
        accountName: '',
        emailAddress: '',
        position: '',
        infringe: '',
        password: '',
        expiry: '',
        degree: '',
        phoneNumber: '',
        bankAccountNumber: '',
        wage: '',
    });
    useEffect(() => {
        axios
            .get('https://k4knowledgegame.pythonanywhere.com/api/teachersAPIViewAll/')
            .then((res) => {
                setTeachers(res.data);
            })
            .catch((error) => {
                console.error('Lỗi', error);
            });
    }, []);

    const callAPI = () => {
        axios
            .get('https://k4knowledgegame.pythonanywhere.com/api/teachersAPIViewAll/')
            .then((res) => {
                setTeachers(res.data);
            })
            .catch((error) => {
                console.error('Lỗi', error);
            });
    };

    const handelDelete = async (idAccount) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa trường dữ liệu ${idAccount} không?`)) {
            axios
                .delete(`http://localhost:8000/api/teachersAPIViewAll/delete/${idAccount}/`)
                .then((response) => {
                    console.log(response.data); // Log thông báo xóa thành công hoặc thông tin khác từ phản hồi của API
                    // Thực hiện các hành động khác sau khi xóa thành công (nếu cần)
                    callAPI();
                })
                .catch((error) => {
                    console.error('Error deleting course:', error); // Log lỗi nếu có
                    // Thực hiện xử lý lỗi hoặc hiển thị thông báo lỗi cho người dùng (nếu cần)
                });
        }
    };

    // Hàm xử lý khi một trường dữ liệu thay đổi
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Hàm xử lý khi form được gửi đi
    const handleUpdate = async (e) => {
        if (window.confirm(`Bạn có chắc chắn muốn sửa trường dữ liệu ${formData.idAccount} không?`)) {
            await axios.put('https://k4knowledgegame.pythonanywhere.com/api/teachersAPIViewAll/', formData);
        } else {
            e.preventDefault();
        }
    };

    // Set up form
    const handleSetUpForm = (id) => {
        setStateForm(1);
        setIdUpdate(id);
        setFormData({ ...formData, idAccount: id });
    };

    // open add form
    const openAddForm = () => {
        setStateAddForm(1);
        setFormData({ ...formData, position: 'Student' });
    };

    const handleAdd = async (e) => {
        window.alert('Thêm thành công!');

        await axios.post('https://k4knowledgegame.pythonanywhere.com/api/teachersAPIViewAll/', formData);
    };
    return (
        <div>
            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>DataTables</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <a href="abc">Home</a>
                                    </li>
                                    <li className="breadcrumb-item active">DataTables</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    {/* /.container-fluid */}
                </section>
                {/* Main content */}
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className={cx('card-header', 'row')}>
                                        <h3 className="card-title col-11">Teachers Table</h3>
                                        <button
                                            type="button"
                                            className={cx('btn btn-success', 'col-1')}
                                            onClick={openAddForm}
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                    {/* /.card-header */}
                                    <div className="card-body">
                                        <table id="example2" className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>STT</th>
                                                    <th>Name</th>
                                                    <th>AccountName</th>
                                                    <th>EmailAddress</th>
                                                    <th>Password</th>
                                                    <th>Infringe</th>
                                                    <th>PhoneNumber</th>
                                                    <th>BankAccountNumber</th>
                                                    <th>Wage</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {teachers &&
                                                    teachers.map((teacher, index) => (
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td>{teacher.name}</td>
                                                            <td>{teacher.accountName}</td>
                                                            <td>{teacher.emailAddress}</td>
                                                            <td>{teacher.password}</td>
                                                            <td>{teacher.infringe}</td>
                                                            <td>{teacher.phoneNumber}</td>
                                                            <td>{teacher.bankAccountNumber}</td>
                                                            <td>{teacher.wage}</td>
                                                            <td className="d-flex justify-content-center align-items-center">
                                                                <button
                                                                    type="button"
                                                                    class="btn btn-info"
                                                                    onClick={() => handleSetUpForm(teacher.idAccount)}
                                                                >
                                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                                </button>

                                                                <button
                                                                    type="button"
                                                                    class="btn btn-danger ml-1"
                                                                    onClick={() => handelDelete(teacher.idAccount)}
                                                                >
                                                                    <FontAwesomeIcon icon={faTrash} />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>

                                        {/* Form */}
                                        {teachers &&
                                            teachers.map(
                                                (teacher) =>
                                                    teacher.idAccount === idUpdate && (
                                                        <div
                                                            className={cx('wrap', { 'display-none': stateForm === 0 })}
                                                        >
                                                            <div className={cx('wrap-update')}>
                                                                <div className="d-flex justify-content-end w-100">
                                                                    <FontAwesomeIcon
                                                                        icon={faClose}
                                                                        className={cx('cusor-pointer')}
                                                                        onClick={() => setStateForm(0)}
                                                                    />
                                                                </div>
                                                                <h2 className="text-center">Teacher Form</h2>
                                                                <form
                                                                    onSubmit={handleUpdate}
                                                                    className={cx('form-wrap')}
                                                                >
                                                                    <div>
                                                                        <label htmlFor="id_transaction_history">
                                                                            ID Transaction History
                                                                        </label>
                                                                        <input
                                                                            type="number"
                                                                            id="id_transaction_history"
                                                                            name="id_transaction_history"
                                                                            defaultValue={
                                                                                teacher.id_transaction_history
                                                                            }
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label htmlFor="name">Name</label>
                                                                        <input
                                                                            type="text"
                                                                            id="name"
                                                                            name="name"
                                                                            defaultValue={teacher.name}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label htmlFor="accountName">
                                                                            Account Name
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            id="accountName"
                                                                            name="accountName"
                                                                            defaultValue={teacher.accountName}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label htmlFor="emailAddress">
                                                                            Email Address
                                                                        </label>
                                                                        <input
                                                                            type="email"
                                                                            id="emailAddress"
                                                                            name="emailAddress"
                                                                            defaultValue={teacher.emailAddress}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label htmlFor="position">Position</label>
                                                                        <input
                                                                            type="text"
                                                                            id="position"
                                                                            name="position"
                                                                            defaultValue={teacher.position}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label htmlFor="infringe">Infringe</label>
                                                                        <input
                                                                            type="text"
                                                                            id="infringe"
                                                                            name="infringe"
                                                                            defaultValue={teacher.infringe}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label htmlFor="password">Password</label>
                                                                        <input
                                                                            type="password"
                                                                            id="password"
                                                                            name="password"
                                                                            defaultValue={teacher.password}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label htmlFor="expiry">Expiry</label>
                                                                        <input
                                                                            type="datetime-local"
                                                                            id="expiry"
                                                                            name="expiry"
                                                                            defaultValue={teacher.expiry.replace(
                                                                                'Z',
                                                                                '',
                                                                            )}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label htmlFor="degree">Degree</label>
                                                                        <input
                                                                            type="text"
                                                                            id="degree"
                                                                            name="degree"
                                                                            defaultValue={teacher.degree}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label htmlFor="phoneNumber">
                                                                            Phone Number
                                                                        </label>
                                                                        <input
                                                                            type="number"
                                                                            id="phoneNumber"
                                                                            name="phoneNumber"
                                                                            defaultValue={teacher.phoneNumber}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label htmlFor="bankAccountNumber">
                                                                            Bank Account Number
                                                                        </label>
                                                                        <input
                                                                            type="number"
                                                                            id="bankAccountNumber"
                                                                            name="bankAccountNumber"
                                                                            defaultValue={teacher.bankAccountNumber}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label htmlFor="Wage">Wage</label>
                                                                        <input
                                                                            type="number"
                                                                            id="Wage"
                                                                            name="Wage"
                                                                            defaultValue={teacher.wage}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    <button type="submit">Submit</button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    ),
                                            )}

                                        {/* Add Form */}
                                        {stateAddForm !== 0 && (
                                            <div className={cx('wrap', { 'display-none': stateAddForm === 0 })}>
                                                <div className={cx('wrap-update')}>
                                                    <div className="d-flex justify-content-end w-100">
                                                        <FontAwesomeIcon
                                                            icon={faClose}
                                                            className={cx('cusor-pointer')}
                                                            onClick={() => setStateAddForm(0)}
                                                        />
                                                    </div>
                                                    <h2 className="text-center">Teacher Form</h2>
                                                    <form onSubmit={handleAdd} className={cx('form-wrap')}>
                                                        <div>
                                                            <label htmlFor="id_transaction_history">
                                                                ID Transaction History
                                                            </label>
                                                            <input
                                                                type="number"
                                                                id="id_transaction_history"
                                                                name="id_transaction_history"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="name">Name</label>
                                                            <input
                                                                type="text"
                                                                id="name"
                                                                name="name"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="accountName">Account Name</label>
                                                            <input
                                                                type="text"
                                                                id="accountName"
                                                                name="accountName"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="emailAddress">Email Address</label>
                                                            <input
                                                                type="email"
                                                                id="emailAddress"
                                                                name="emailAddress"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="position">Position</label>
                                                            <input
                                                                type="text"
                                                                id="position"
                                                                name="position"
                                                                defaultValue="Teacher"
                                                                disabled="true"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="infringe">Infringe</label>
                                                            <input
                                                                type="text"
                                                                id="infringe"
                                                                name="infringe"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="password">Password</label>
                                                            <input
                                                                type="password"
                                                                id="password"
                                                                name="password"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="expiry">Expiry</label>
                                                            <input
                                                                type="datetime-local"
                                                                id="expiry"
                                                                name="expiry"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="degree">Degree</label>
                                                            <input
                                                                type="text"
                                                                id="degree"
                                                                name="degree"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="phoneNumber">Phone Number</label>
                                                            <input
                                                                type="number"
                                                                id="phoneNumber"
                                                                name="phoneNumber"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="bankAccountNumber">
                                                                Bank Account Number
                                                            </label>
                                                            <input
                                                                type="number"
                                                                id="bankAccountNumber"
                                                                name="bankAccountNumber"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="wage">Wage</label>
                                                            <input
                                                                type="number"
                                                                id="wage"
                                                                name="wage"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <button type="submit">Submit</button>
                                                    </form>
                                                </div>
                                            </div>
                                        )}
                                        <nav aria-label="Page navigation example">
                                            <ul className="pagination pt-2">
                                                <li className="page-item">
                                                    <a className="page-link" href="abc">
                                                        Previous
                                                    </a>
                                                </li>
                                                <li className="page-item">
                                                    <a className="page-link" href="abc">
                                                        1
                                                    </a>
                                                </li>
                                                <li className="page-item">
                                                    <a className="page-link" href="abc">
                                                        2
                                                    </a>
                                                </li>
                                                <li className="page-item">
                                                    <a className="page-link" href="abc">
                                                        3
                                                    </a>
                                                </li>
                                                <li className="page-item">
                                                    <a className="page-link" href="abc">
                                                        Next
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                    {/* /.card-body */}
                                </div>
                                {/* /.card */}
                            </div>
                            {/* /.col */}
                        </div>
                        {/* /.row */}
                    </div>
                    {/* /.container-fluid */}
                </section>
                {/* /.content */}
            </div>
        </div>
    );
}

export default Teachers;
