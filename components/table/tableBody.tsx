"use client"
import { Employee } from "@/constants/types";
import { ReactNode } from "react";
import EditEmployee from "../modals/editEmployee";
import { DeleteEmployee } from "..";
import { useGetAllEmployeesQuery } from "@/lib/api/employeeApi";

interface DataCellProps {
  children: ReactNode;
}

const DataCell = ({ children }: DataCellProps) => (
  <td scope="row" className="px-6 py-4 font-medium text-gray-900 text-center">
    {children}
  </td>
);

const Loader = () => (
  <tr>
    <td className="text-center" colSpan={8}>
      ...loading
    </td>
  </tr>
);

export default function TableBody() {
 const { data: employeesList, isLoading } = useGetAllEmployeesQuery("");
  return (
    <tbody>
      {isLoading ? (
        <Loader />
      ) : (
        employeesList.map((employee: Employee) => (
          <tr key={employee.id}>
            <DataCell>{employee.name}</DataCell>
            <DataCell>{employee.email}</DataCell>
            <DataCell>{employee.age}</DataCell>
            <DataCell>{employee.position}</DataCell>
            <DataCell>{employee.department}</DataCell>
            <DataCell>
              <div className="flex align-center justify-center gap-2">
                <DeleteEmployee id={employee.id} name={employee.name} />
                <EditEmployee employee={employee} />
              </div>
            </DataCell>
          </tr>
        ))
      )}
    </tbody>
  );
}
