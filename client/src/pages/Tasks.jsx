import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import SectionHeader from "../components/SectionHeader";
import StatusChip from "../components/StatusChip";
import TaskDialog from "../components/TaskDialog";
import ConfirmDialog from "../components/ConfirmDialog";
import { useNavigate } from "react-router-dom";
export default function Tasks() {
  const { user } = useAuth(),
    admin = user?.role === "ADMIN",
    nav = useNavigate();
  const [rows, setRows] = useState([]),
    [projects, setProjects] = useState([]),
    [users, setUsers] = useState([]),
    [open, setOpen] = useState(false),
    [selected, setSelected] = useState(null),
    [del, setDel] = useState(null),
    [error, setError] = useState(""),
    [filters, setFilters] = useState({ status: "", priority: "", project: "" });
  const load = () =>
    api
      .get("/tasks", {
        params: Object.fromEntries(
          Object.entries(filters).filter(([, v]) => v),
        ),
      })
      .then((r) => setRows(r.data.data))
      .catch((e) => setError(e.message));
  useEffect(() => {
    api.get("/projects").then((r) => setProjects(r.data.data));
    if (admin)
      api
        .get("/users")
        .then((r) =>
          setUsers(r.data.data.filter((u) => u.role === "DEVELOPER")),
        );
  }, []);
  useEffect(() => {
    load();
  }, [filters]);
  const remove = async () => {
    try {
      await api.delete(`/tasks/${del._id}`);
      setDel(null);
      load();
    } catch (e) {
      setError(e.message);
    }
  };
  const columns = [
    {
      field: "title",
      headerName: "Task",
      flex: 1.3,
      minWidth: 180,
      renderCell: (p) => (
        <Box>
          <Typography fontWeight={700} fontSize={13}>
            {p.row.title}
          </Typography>
          <Typography color="text.secondary" fontSize={11}>
            {p.row.project?.name || "Project"}
          </Typography>
        </Box>
      ),
    },
    {
      field: "assignee",
      headerName: "Assignee",
      flex: 1,
      minWidth: 130,
      valueGetter: (_value, row) => row.assignee?.name || "—",
    },
    {
      field: "status",
      headerName: "Status",
      width: 140,
      renderCell: (p) => <StatusChip status={p.value} />,
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 105,
      renderCell: (p) => (
        <Chip
          size="small"
          label={p.value}
          color={
            p.value === "HIGH"
              ? "error"
              : p.value === "MEDIUM"
                ? "warning"
                : "default"
          }
          variant="outlined"
        />
      ),
    },
    {
      field: "deadline",
      headerName: "Due date",
      width: 120,
      valueFormatter: (value) =>
        value ? new Date(value).toLocaleDateString() : "—",
    },
    {
      field: "progress",
      headerName: "Progress",
      width: 130,
      renderCell: (p) => (
        <Stack direction="row" alignItems="center" gap={1} width="100%">
          <Box flex={1}>
            <Box height={6} bgcolor="#edf0f5" borderRadius={5}>
              <Box
                height={6}
                width={`${p.value}%`}
                bgcolor="#6174e5"
                borderRadius={5}
              />
            </Box>
          </Box>
          <Typography fontSize={11}>{p.value}%</Typography>
        </Stack>
      ),
    },
    {
      field: "actions",
      headerName: "",
      sortable: false,
      width: 100,
      renderCell: (p) => (
        <Stack direction="row">
          {admin && (
            <>
              <Tooltip title="Edit">
                <IconButton
                  size="small"
                  onClick={() => {
                    setSelected(p.row);
                    setOpen(true);
                  }}
                >
                  <EditOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => setDel(p.row)}
                >
                  <DeleteOutlineRoundedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          )}
          {/* <Button size="small" onClick={() => nav(`/tasks/${p.row._id}`)}>
            Open
          </Button> */}
        </Stack>
      ),
    },
  ];
  return (
    <>
      <SectionHeader
        eyebrow="EXECUTION"
        title="Tasks"
        subtitle="Stay on top of priorities, ownership and delivery dates."
        action={
          admin && (
            <Button
              variant="contained"
              startIcon={<AddRoundedIcon />}
              onClick={() => {
                setSelected(null);
                setOpen(true);
              }}
            >
              New task
            </Button>
          )
        }
      />
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Stack direction={{ xs: "column", sm: "row" }} gap={1.5} mb={2}>
        <TextField
          select
          size="small"
          label="Status"
          value={filters.status}
          onChange={(e) =>
            setFilters((f) => ({ ...f, status: e.target.value }))
          }
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="">All statuses</MenuItem>
          {[
            ["TO_DO", "To Do"],
            ["IN_PROGRESS", "In Progress"],
            ["UNDER_REVIEW", "Under Review"],
            ["COMPLETED", "Completed"],
          ].map(([v, l]) => (
            <MenuItem key={v} value={v}>
              {l}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          size="small"
          label="Priority"
          value={filters.priority}
          onChange={(e) =>
            setFilters((f) => ({ ...f, priority: e.target.value }))
          }
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="">All priorities</MenuItem>
          {["HIGH", "MEDIUM", "LOW"].map((v) => (
            <MenuItem key={v} value={v}>
              {v}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          size="small"
          label="Project"
          value={filters.project}
          onChange={(e) =>
            setFilters((f) => ({ ...f, project: e.target.value }))
          }
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">All projects</MenuItem>
          {projects.map((p) => (
            <MenuItem key={p._id} value={p._id}>
              {p.name}
            </MenuItem>
          ))}
        </TextField>
        <Button
          color="inherit"
          onClick={() => setFilters({ status: "", priority: "", project: "" })}
        >
          Clear filters
        </Button>
      </Stack>
      <Paper sx={{ height: 590, width: "100%", overflow: "hidden" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(r) => r._id}
          disableRowSelectionOnClick
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 10 } },
          }}
          sx={{
            border: 0,
            "& .MuiDataGrid-columnHeaders": {
              bgcolor: "#fafbfe",
              fontWeight: 800,
            },
            "& .MuiDataGrid-cell": { borderColor: "#f0f1f5" },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: 800,
              fontSize: 12,
            },
          }}
        />
      </Paper>
      <TaskDialog
        open={open}
        onClose={() => setOpen(false)}
        onSaved={load}
        task={selected}
        projects={projects}
        users={users}
      />
      <ConfirmDialog
        open={Boolean(del)}
        title="Delete this task?"
        onClose={() => setDel(null)}
        onConfirm={remove}
      />
    </>
  );
}
