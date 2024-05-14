import React from "react";
import { useState } from "react";

import { PAGINATION_PAGE_SIZE } from "./../constants.js";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Box from "@mui/material/Box";

export default function Type({ route, router, gauze, model }) {
	const header = model.read("HEADER", route.params.type);
	// use pagination record once we implement it
	const pagination_key = router.buildUrl(route.name, route.params);
	const pagination_set = model.read("PAGINATION_SET", pagination_key);
	const pagination_count = model.read("PAGINATION_COUNT", pagination_key);

	const offset = route.params.offset ? Number.parseInt(route.params.offset) : 0;
	const limit = route.params.limit ? Number.parseInt(route.params.limit) : PAGINATION_PAGE_SIZE;
	if (pagination_count && pagination_count.length && pagination_set) {
		const total = pagination_count[0].count;
		const page_current = Math.floor(Math.max(offset / limit) + 1);
		const page_max_no_skew = Math.floor(Math.max(total / limit));
		const page_max = page_max_no_skew < page_current ? page_current : page_max_no_skew;
		console.log("pagination_set", pagination_set);
		console.log("pagination_count", pagination_count);
		console.log("page_current", page_current);
		console.log("page_max", page_max);
		const fields = header.attributes.split(" ");
		const page = pagination_set.map(function (id) {
			return model.read(header.type, id);
		});
		return (
			<div>
				<h1 align="right">{header.type}</h1>
				<div align="right">Type</div>
				<hr />
				<Box display="flex" justifyContent="center" alignItems="center">
					<Pagination
						count={page_max}
						defaultPage={page_current}
						boundaryCount={2}
						renderItem={(item) => {
							var paginate;
							if (item.type === "previous") {
								paginate = {
									limit: limit,
									offset: Math.max(0, offset - limit),
								};
							} else if (item.type === "next") {
								paginate = {
									limit: limit,
									offset: Math.min((page_max - 1) * limit, offset + limit),
								};
							} else if (item.type === "page") {
								paginate = {
									limit: limit,
									offset: (item.page - 1) * limit,
								};
							} else {
								paginate = {
									limit: limit,
									offset: offset,
								};
							}
							return (
								<a
									href={router.buildUrl(route.name, {
										...route.params,
										...paginate,
									})}
								>
									<PaginationItem {...item} />
								</a>
							);
						}}
					/>
				</Box>
				<div>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
								<TableRow>
									{fields.map(function (field, index) {
										if (index === 0) {
											return <TableCell key={field}>{field}</TableCell>;
										} else {
											return (
												<TableCell align="right" key={field}>
													{field}
												</TableCell>
											);
										}
									})}
								</TableRow>
								<TableRow>
									{fields.map(function (field, index) {
										if (index === 0) {
											return <TableCell key={field}>{field}</TableCell>;
										} else {
											return (
												<TableCell align="right" key={field}>
													{field}
												</TableCell>
											);
										}
									})}
								</TableRow>
							</TableHead>
							<TableBody>
								{page.map((item) => (
									<TableRow key={item[header.primary_key]} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
										{fields.map(function (field, index) {
											if (index === 0) {
												return (
													<TableCell component="th" scope="row" key={`${item[header.primary_key]}:${field}`}>
														{item[field]}
													</TableCell>
												);
											} else {
												return (
													<TableCell align="right" key={`${item[header.primary_key]}:${field}`}>
														{item[field]}
													</TableCell>
												);
											}
										})}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					{/*
					{page.map(function (item) {
						return (
							<div>
								<div key={item[header.primary_key]}>
									{fields.map(function (field) {
										return (
											<div key={field}>
												{field}: {item[field]}
											</div>
										);
									})}
								</div>
								<hr/>
							</div>
						);
					})}
		*/}
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<h1 align="right">{header.type}</h1>
				<div align="right">Type</div>
				<hr />
			</div>
		);
	}
}
