import React, { useEffect, useState, useRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { fetchData as fetchProductData, createData as createProductData, updateData as updateProductData, deleteData as deleteProductData } from '../../redux/admin/productActions';
import { fetchData as fetchUserData } from '../../redux/admin/userActions';
import { IconButton } from '@mui/material';
import { Delete, Update, Edit } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { TextField } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Button } from '@mui/material';
import { Checkbox } from '@mui/material';
import { actions as productAdminActions } from '../../redux/admin/product';
//['Message'=>'GET products is successful', 'products'=>$products]
const Products = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let productAdmin = useSelector((state) => state.productAdmin)
    let userAdmin = useSelector((state) => state.userAdmin)
    let user = useSelector((state) => state.auth)

    let [formList, setFormList] = useState([])
    let [selectId, getId] = useState()




    const [form, setForm] = useState(
        {
            user_id: userAdmin.users ? userAdmin.users[0].id : '',
        }
    )
    const handleChange = (event) => {
        console.log(event)

        setForm({
            ...form,
            [event.target.id ? event.target.id : event.target.name]: event.target.value,
        });
        console.log(form)

    };
    const handleUpdateChange = (event, id) => {
        console.log(event)
        try {

            let newFormList = [...formList]

            newFormList[writePayload.indexOf(id)] = { ...(newFormList[writePayload.indexOf(id)] || {}), [event.target.id ? event.target.id : event.target.name]: event.target.value }
            setFormList(
                newFormList
            );
            console.log('formList T_T', formList)

        } catch (error) {
            console.log(error)
        }

    };



    const handleCheckChange = (id, event, data) => {
        console.log(id, event)
        event.target.checked ? setFormList([
            ...formList, data
        ]) : formList.splice(writePayload.indexOf(id), 1)
        event.target.checked ? dispatch(productAdminActions.addWrite(id)) : dispatch(productAdminActions.removeWrite(id))

        console.log(writePayload)
        console.log(formList)

    }

    let writePayload = productAdmin.write.writePayload
    useEffect(() => {

        let privelege = user.userData.privelege
        if (privelege !== 'admin') {
            navigate('/dashboard')
        }
        console.log('user state', productAdmin)
        console.log('isChanged', productAdmin.write.isChanged)
        if (productAdmin.write.isChanged) {
            if (!userAdmin.users) {
                dispatch(fetchUserData())
            }
            dispatch(fetchProductData())
            console.log('changed??', productAdmin.products)
        }

    }, [productAdmin, navigate, dispatch, user.userData.privelege, userAdmin.users])
    console.log('data', productAdmin)
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Code</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Sale Price</TableCell>
                        <TableCell>Buy Price</TableCell>
                        <TableCell>Discount</TableCell>
                        <TableCell>Tax</TableCell>
                        <TableCell>Owner ID</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {productAdmin.products ? productAdmin.products.map((product) => (
                        <TableRow key={product.id} id={product.id}>
                            {writePayload && writePayload.indexOf(product.id) !== -1 ? (<>

                                <TableCell>
                                    <TextField
                                        required
                                        value={formList[writePayload.indexOf(product.id)].id}
                                        onChange={(event) => handleUpdateChange(event, product.id)}
                                        fullWidth
                                        id='id'
                                        label='ID'
                                        name='id'

                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        required
                                        value={formList[writePayload.indexOf(product.id)].code}
                                        onChange={(event) => handleUpdateChange(event, product.id)}
                                        fullWidth
                                        id='code'
                                        label='Code'
                                        name='code'

                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        required
                                        value={formList[writePayload.indexOf(product.id)].name}
                                        onChange={(event) => handleUpdateChange(event, product.id)}
                                        fullWidth
                                        id='name'
                                        label='Name'
                                        name='name'

                                    />

                                </TableCell>
                                <TableCell>
                                    <TextField
                                        required
                                        value={formList[writePayload.indexOf(product.id)].description}
                                        onChange={(event) => handleUpdateChange(event, product.id)}
                                        fullWidth
                                        id='description'
                                        label='Description'
                                        name='description'

                                    />
                                </TableCell>
                                <TableCell>
                                    <Select fullWidth name='category' id='category' value={formList[writePayload.indexOf(product.id)].category} label='Category' onChange={(event) => handleUpdateChange(event, product.id)}>
                                        <MenuItem value='Category Name 1' className='category'>
                                            Category Name 1
                                        </MenuItem>
                                        <MenuItem value='Category Name 2' className='category'>
                                            Category Name 2
                                        </MenuItem>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        required
                                        value={formList[writePayload.indexOf(product.id)].sale_price}
                                        onChange={(event) => handleUpdateChange(event, product.id)}
                                        fullWidth
                                        id='sale_price'
                                        label='Sale Price'
                                        name='sale_price'

                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        required
                                        value={formList[writePayload.indexOf(product.id)].buy_price}
                                        onChange={(event) => handleUpdateChange(event, product.id)}
                                        fullWidth
                                        id='buy_price'
                                        label='Buy Price'
                                        name='buy_price'

                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        required
                                        value={formList[writePayload.indexOf(product.id)].discount}
                                        onChange={(event) => handleUpdateChange(event, product.id)}
                                        fullWidth
                                        id='discount'
                                        label='Discount'
                                        name='discount'

                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        required
                                        value={formList[writePayload.indexOf(product.id)].tax}
                                        onChange={(event) => handleUpdateChange(event, product.id)}
                                        fullWidth
                                        id='tax'
                                        label='Tax'
                                        name='tax'

                                    />
                                </TableCell>
                                <TableCell>
                                    <Select fullWidth name='user_id' id='user_id' value={formList[writePayload.indexOf(product.id)].user_id} label='Owner Id' onChange={(event) => handleUpdateChange(event, product.id)}>
                                        {
                                            userAdmin.users.map(
                                                user =>
                                                (
                                                    <MenuItem key={user.id} value={user.id} className='user_id'>
                                                        {
                                                            user.id
                                                        }
                                                    </MenuItem>
                                                )
                                            )
                                        }
                                    </Select>
                                </TableCell>
                            </>)

                                : (<><TableCell>{product.id}</TableCell>
                                    <TableCell>{product.code}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>{product.sale_price}</TableCell>
                                    <TableCell>{product.buy_price}</TableCell>
                                    <TableCell>{product.discount}</TableCell>
                                    <TableCell>{product.tax}</TableCell>
                                    <TableCell>{product.user_id}</TableCell></>)}
                            <TableCell>{writePayload.indexOf(product.id) !== -1 ? <IconButton onClick={() =>
                                dispatch(deleteProductData(writePayload))

                            }>
                                {
                                    productAdmin.write.isChanged && writePayload.indexOf(product.id) !== -1 && productAdmin.write.writeType == 'DELETE' ? <CircularProgress /> : <Delete />
                                } </IconButton> : null}


                                {productAdmin.write.isChanged && writePayload.indexOf(product.id) !== -1 && productAdmin.write.writeType == 'UPDATE' ? <CircularProgress /> : writePayload.indexOf(product.id) !== -1 ? <Button onClick={() => dispatch(updateProductData(formList, writePayload))}>
                                    Update
                                </Button> : null}
                                <Checkbox onClick={(event) => handleCheckChange(product.id, event, product)} />
                            </TableCell>
                        </TableRow>
                    )) : null}
                    <TableRow>

                        <TableCell>
                            <TextField
                                required

                                onChange={handleChange}
                                fullWidth
                                id='id'
                                label='ID'
                                name='id'

                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                required

                                onChange={handleChange}
                                fullWidth
                                id='code'
                                label='Code'
                                name='code'

                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                required

                                onChange={handleChange}
                                fullWidth
                                id='name'
                                label='Name'
                                name='name'

                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                required

                                onChange={handleChange}
                                fullWidth
                                id='description'
                                label='Description'
                                name='description'

                            />
                        </TableCell>
                        <TableCell>
                            <Select fullWidth name='category' id='category' label='Category' onChange={handleChange}>
                                <MenuItem value='Category Name 1' className='category' selected>
                                    Category Name 1
                                </MenuItem>
                                <MenuItem value='Category Name 2' className='category'>
                                    Category Name 2
                                </MenuItem>
                            </Select>
                        </TableCell>
                        <TableCell>
                            <TextField
                                required

                                onChange={handleChange}
                                fullWidth
                                id='sale_price'
                                label='Sale Price'
                                name='sale_price'

                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                required

                                onChange={handleChange}
                                fullWidth
                                id='buy_price'
                                label='Buy Price'
                                name='buy_price'

                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                required

                                onChange={handleChange}
                                fullWidth
                                id='discount'
                                label='Discount'
                                name='discount'

                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                required

                                onChange={handleChange}
                                fullWidth
                                id='tax'
                                label='Tax'
                                name='tax'

                            />
                        </TableCell>
                        <TableCell>
                            <Select value={form.user_id} fullWidth name='user_id' id='user_id' label='Owner Id' onChange={handleChange}>
                                {
                                    userAdmin.users ? userAdmin.users.map(
                                        user =>
                                        (
                                            <MenuItem key={user.id} value={user.id} className='user_id'>
                                                {
                                                    user.id
                                                }
                                            </MenuItem>
                                        )
                                    ) : null
                                }
                            </Select>
                        </TableCell>
                        <TableCell>
                            {productAdmin.write.isChanged && productAdmin.write.writeType == 'CREATE' ? <CircularProgress /> : <Button onClick={() => dispatch(createProductData([form], [form.id]))}>
                                Add
                            </Button>}
                            <Button onClick={
                                () => {
                                    console.log(writePayload)
                                    console.log(formList)
                                }
                            }>Click Me</Button>
                        </TableCell>

                    </TableRow>

                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Products;