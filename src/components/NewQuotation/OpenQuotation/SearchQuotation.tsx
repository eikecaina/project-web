import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
  ColDef,
  GridApi,
  IDateFilterParams,
  ITextFilterParams,
  RowSelectedEvent,
} from "ag-grid-community";
import { SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { Button, Modal, Spin } from "antd";
import { useTranslation } from "react-i18next";
import Loading from "components/Loading";
import { GetAllQuotation } from "@/app/api/services/Quotation/data";
import { UUID } from "crypto";
import { formatDateBr } from "@/components/utilsDays";

interface SearchQuotationProps {
  isModalOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onRowSelect: (rowData: any) => void;
}

type Quotation = {
  user: string;
  customer: string;
  quotation: number;
  ov: number;
  created: Date;
};

const filterParams: IDateFilterParams = {
  comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split("/");
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );

    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }

    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }

    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
    return 0;
  },
  minValidYear: 2000,
  maxValidYear: 2024,
  inRangeFloatingFilterDateFormat: "DD MM YYYY",
};

const SearchQuotation: React.FC<SearchQuotationProps> = ({
  isModalOpen,
  setModalIsOpen,
  onRowSelect,
}) => {
  const { t } = useTranslation("layout");
  const gridRef = useRef<AgGridReact>(null);
  const [selectedRow, setSelectedRow] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      headerName: t("labels.user"),
      field: "user",
      suppressHeaderMenuButton: true,
    },
    {
      headerName: t("labels.client"),
      field: "customer",
      suppressHeaderMenuButton: true,
    },
    {
      headerName: t("labels.quotation"),
      field: "quotation",
      suppressHeaderMenuButton: true,
    },
    {
      headerName: t("labels.salesOrder"),
      field: "ov",
      suppressHeaderMenuButton: true,
    },
    {
      headerName: t("labels.created"),
      field: "created",
      filter: "agDateColumnFilter",
      filterParams: filterParams,
      suppressHeaderMenuButton: true,
    },
  ]);
  const [rowData, setRowData] = useState<Quotation[]>([
    {
      user: "Alice Brown",
      customer: "XYZ Ltd.",
      quotation: 10001,
      ov: 20001,
      created: new Date("2022-01-15"),
    },
    {
      user: "Bob Smith",
      customer: "LMN Inc.",
      quotation: 10002,
      ov: 20002,
      created: new Date("2022-02-12"),
    },
    {
      user: "Carla Johnson",
      customer: "DEF Corp.",
      quotation: 10003,
      ov: 20003,
      created: new Date("2022-03-10"),
    },
    {
      user: "David Wilson",
      customer: "GHI Ltd.",
      quotation: 10004,
      ov: 20004,
      created: new Date("2022-04-05"),
    },
    {
      user: "Ella White",
      customer: "JKL LLC",
      quotation: 10005,
      ov: 20005,
      created: new Date("2022-05-22"),
    },
    {
      user: "Fred Evans",
      customer: "ABC Corp.",
      quotation: 10006,
      ov: 20006,
      created: new Date("2022-06-17"),
    },
    {
      user: "Grace Lewis",
      customer: "MNO Corp.",
      quotation: 10007,
      ov: 20007,
      created: new Date("2022-07-14"),
    },
    {
      user: "Henry Young",
      customer: "QRS Ltd.",
      quotation: 10008,
      ov: 20008,
      created: new Date("2022-08-01"),
    },
    {
      user: "Ivy Clark",
      customer: "TUV Inc.",
      quotation: 10009,
      ov: 20009,
      created: new Date("2022-09-06"),
    },
    {
      user: "Jack King",
      customer: "WXY Ltd.",
      quotation: 10010,
      ov: 20010,
      created: new Date("2022-10-09"),
    },
    {
      user: "Karen Hall",
      customer: "ABC Corp.",
      quotation: 10011,
      ov: 20011,
      created: new Date("2022-11-22"),
    },
    {
      user: "Liam Scott",
      customer: "LMN Inc.",
      quotation: 10012,
      ov: 20012,
      created: new Date("2022-12-15"),
    },
    {
      user: "Mia Turner",
      customer: "DEF Corp.",
      quotation: 10013,
      ov: 20013,
      created: new Date("2023-01-05"),
    },
    {
      user: "Nina Adams",
      customer: "GHI Ltd.",
      quotation: 10014,
      ov: 20014,
      created: new Date("2023-02-14"),
    },
    {
      user: "Oscar Ramirez",
      customer: "JKL LLC",
      quotation: 10015,
      ov: 20015,
      created: new Date("2023-03-08"),
    },
    {
      user: "Paula Martinez",
      customer: "MNO Corp.",
      quotation: 10016,
      ov: 20016,
      created: new Date("2023-04-19"),
    },
    {
      user: "Quinn Bennett",
      customer: "QRS Ltd.",
      quotation: 10017,
      ov: 20017,
      created: new Date("2023-05-23"),
    },
    {
      user: "Rick Edwards",
      customer: "TUV Inc.",
      quotation: 10018,
      ov: 20018,
      created: new Date("2023-06-29"),
    },
    {
      user: "Sara Collins",
      customer: "WXY Ltd.",
      quotation: 10019,
      ov: 20019,
      created: new Date("2023-07-13"),
    },
    {
      user: "Tommy Roberts",
      customer: "ABC Corp.",
      quotation: 10020,
      ov: 20020,
      created: new Date("2023-08-17"),
    },
    {
      user: "Uma Phillips",
      customer: "LMN Inc.",
      quotation: 10021,
      ov: 20021,
      created: new Date("2023-09-03"),
    },
    {
      user: "Victor Green",
      customer: "DEF Corp.",
      quotation: 10022,
      ov: 20022,
      created: new Date("2023-10-07"),
    },
    {
      user: "Wendy Baker",
      customer: "GHI Ltd.",
      quotation: 10023,
      ov: 20023,
      created: new Date("2023-11-02"),
    },
    {
      user: "Xander Hughes",
      customer: "JKL LLC",
      quotation: 10024,
      ov: 20024,
      created: new Date("2023-12-10"),
    },
    {
      user: "Yara Grant",
      customer: "MNO Corp.",
      quotation: 10025,
      ov: 20025,
      created: new Date("2024-01-13"),
    },
    {
      user: "Zack Parker",
      customer: "QRS Ltd.",
      quotation: 10026,
      ov: 20026,
      created: new Date("2024-02-08"),
    },
    {
      user: "Amy Roberts",
      customer: "TUV Inc.",
      quotation: 10027,
      ov: 20027,
      created: new Date("2024-03-06"),
    },
    {
      user: "Brian Price",
      customer: "WXY Ltd.",
      quotation: 10028,
      ov: 20028,
      created: new Date("2024-04-04"),
    },
    {
      user: "Caroline Watson",
      customer: "ABC Corp.",
      quotation: 10029,
      ov: 20029,
      created: new Date("2024-05-09"),
    },
  ]);
  const [selectedData, setSelectedData] = useState();

  function clearFilters() {
    if (gridRef.current && gridRef.current.api) {
      const gridApi: GridApi = gridRef.current.api;
      gridApi.setFilterModel(null);
    }
  }

  const containerStyle = useMemo(() => ({ width: "100%", height: "70vh" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      flex: 1,
      floatingFilter: true,
      filterParams: {
        buttons: ["clear"],
      } as ITextFilterParams,
      suppressMenu: true,
    }),
    []
  );

  const handleOk = () => {
    setModalIsOpen(false);
  };

  const handleCancel = () => {
    setModalIsOpen(false);
  };

  const handleRowSelected = (event: RowSelectedEvent) => {
    setSelectedData(event.data);

    onRowSelect(selectedData);
  };

  useEffect(() => {
    handleRowSelected;
    console.log("Data: ", selectedData);
  }, [handleRowSelected]);

  const handleOpen = () => {
    if (selectedRow) {
      console.log("Dados da linha selecionada:", selectedRow);
    } else {
      console.log("Nenhuma linha selecionada.");
    }
    setModalIsOpen(false);
  };

  async function getAllQuotation() {
    const response = await GetAllQuotation();

    const quotationData = response.map(
      (quotation: {
        id: UUID;
        ds_customer: string;
        ds_sales_order: number;
        dt_created: Date;
        user: string;
        ds_quotation: number;
      }) => ({
        id: quotation.id,
        user: "Eike",
        customer: quotation.ds_customer,
        quotation: quotation.ds_quotation,
        ov: quotation.ds_sales_order,
        created: formatDateBr(quotation.dt_created),
      })
    );
    setRowData(quotationData);
  }

  useEffect(() => {
    getAllQuotation();
  }, []);

  return (
    <Modal
      width={"100%"}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      closable={false}
      okText={t("generalButtons.openButton")}
      cancelText={t("generalButtons.cancelButton")}
      footer={[
        <Button key="back" onClick={clearFilters}>
          {t("generalButtons.cleanFilters")}
        </Button>,
        <Button key="link" type="primary" onClick={handleOk}>
          {t("generalButtons.cancelButton")}
        </Button>,
        <Button key="submit" type="primary" onClick={handleOpen}>
          {t("generalButtons.openButton")}
        </Button>,
      ]}
    >
      <div className="ag-theme-quartz" style={containerStyle}>
        <div style={gridStyle}>
          <AgGridReact
            onRowSelected={handleRowSelected}
            ref={gridRef}
            pagination={true}
            paginationPageSize={20}
            paginationPageSizeSelector={[20, 30, 50]}
            rowSelection="single"
            animateRows={true}
            sideBar={"columns"}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
          />
        </div>
      </div>
      {loading && <Loading />}
    </Modal>
  );
};

export default SearchQuotation;
