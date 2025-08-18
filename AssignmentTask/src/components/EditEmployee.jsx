import React from 'react';
import { Formik, Form, Field } from 'formik';

const EditEmployeeForm = ({initialValues, onSave, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Employee</h2>

                <Formik
                    initialValues={{
                        employeeCode: '',
                        firstName: '',
                        lastName: '',
                        designation: '',
                        salary: '',
                        appraisalDate: '',
                        joiningDate: '',
                    }}
                    onSubmit={(values) => {
                        onSave(values);
                    }}
                >
                    {() => (
                        <Form className="space-y-4">
                            <div>
                                <label className="block mb-1 text-sm font-medium">Employee Code</label>
                                <Field name="employeeCode" className="w-full border rounded px-3 py-2" />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium">First Name</label>
                                <Field name="firstName" className="w-full border rounded px-3 py-2" />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium">Last Name</label>
                                <Field name="lastName" className="w-full border rounded px-3 py-2" />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium">Designation</label>
                                <Field name="designation" className="w-full border rounded px-3 py-2" />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium">Salary</label>
                                <Field name="salary" className="w-full border rounded px-3 py-2" />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium">Appraisal Date</label>
                                <Field name="appraisalDate" type="date" className="w-full border rounded px-3 py-2" />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium">Joining Date</label>
                                <Field name="joiningDate" type="date" className="w-full border rounded px-3 py-2" />
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={onCancel}
                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default EditEmployeeForm;
