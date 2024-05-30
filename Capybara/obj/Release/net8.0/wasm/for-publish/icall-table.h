#define ICALL_TABLE_corlib 1

static int corlib_icall_indexes [] = {
231,
241,
242,
243,
244,
245,
246,
247,
248,
249,
252,
253,
360,
361,
362,
391,
392,
393,
413,
414,
415,
416,
513,
514,
515,
518,
555,
556,
557,
558,
562,
564,
566,
568,
573,
581,
582,
583,
584,
585,
586,
587,
588,
589,
685,
686,
751,
757,
760,
762,
767,
768,
770,
771,
775,
776,
778,
780,
781,
784,
785,
786,
789,
791,
794,
796,
798,
807,
871,
873,
875,
885,
886,
887,
888,
890,
897,
898,
899,
900,
901,
909,
910,
911,
915,
916,
918,
922,
923,
924,
1203,
1379,
1380,
7398,
7399,
7401,
7402,
7403,
7404,
7405,
7407,
7409,
7411,
7412,
7413,
7423,
7425,
7432,
7434,
7436,
7438,
7489,
7490,
7492,
7493,
7494,
7495,
7496,
7498,
7500,
8554,
8558,
8560,
8561,
8562,
8563,
8812,
8813,
8814,
8815,
8833,
8834,
8835,
8837,
8880,
8953,
8955,
8957,
8966,
8967,
8968,
8969,
9416,
9421,
9422,
9449,
9467,
9474,
9481,
9492,
9495,
9515,
9588,
9590,
9599,
9601,
9602,
9609,
9623,
9643,
9644,
9652,
9654,
9661,
9662,
9665,
9667,
9672,
9678,
9679,
9686,
9688,
9700,
9703,
9704,
9705,
9716,
9725,
9731,
9732,
9733,
9735,
9736,
9753,
9755,
9769,
9786,
9813,
9843,
9844,
10328,
10420,
10421,
10623,
10624,
10631,
10632,
10633,
10638,
10713,
11226,
11227,
11729,
11730,
11735,
11745,
12523,
12544,
12546,
12548,
};
void ves_icall_System_Array_InternalCreate (int,int,int,int,int);
int ves_icall_System_Array_GetCorElementTypeOfElementTypeInternal (int);
int ves_icall_System_Array_IsValueOfElementTypeInternal (int,int);
int ves_icall_System_Array_CanChangePrimitive (int,int,int);
int ves_icall_System_Array_FastCopy (int,int,int,int,int);
int ves_icall_System_Array_GetLengthInternal_raw (int,int,int);
int ves_icall_System_Array_GetLowerBoundInternal_raw (int,int,int);
void ves_icall_System_Array_GetGenericValue_icall (int,int,int);
void ves_icall_System_Array_GetValueImpl_raw (int,int,int,int);
void ves_icall_System_Array_SetGenericValue_icall (int,int,int);
void ves_icall_System_Array_SetValueImpl_raw (int,int,int,int);
void ves_icall_System_Array_SetValueRelaxedImpl_raw (int,int,int,int);
void ves_icall_System_Runtime_RuntimeImports_ZeroMemory (int,int);
void ves_icall_System_Runtime_RuntimeImports_Memmove (int,int,int);
void ves_icall_System_Buffer_BulkMoveWithWriteBarrier (int,int,int,int);
int ves_icall_System_Delegate_AllocDelegateLike_internal_raw (int,int);
int ves_icall_System_Delegate_CreateDelegate_internal_raw (int,int,int,int,int);
int ves_icall_System_Delegate_GetVirtualMethod_internal_raw (int,int);
void ves_icall_System_Enum_GetEnumValuesAndNames_raw (int,int,int,int);
void ves_icall_System_Enum_InternalBoxEnum_raw (int,int,int64_t,int);
int ves_icall_System_Enum_InternalGetCorElementType (int);
void ves_icall_System_Enum_InternalGetUnderlyingType_raw (int,int,int);
int ves_icall_System_Environment_get_ProcessorCount ();
int ves_icall_System_Environment_get_TickCount ();
int64_t ves_icall_System_Environment_get_TickCount64 ();
void ves_icall_System_Environment_FailFast_raw (int,int,int,int);
int ves_icall_System_GC_GetMaxGeneration ();
void ves_icall_System_GC_InternalCollect (int);
void ves_icall_System_GC_register_ephemeron_array_raw (int,int);
int ves_icall_System_GC_get_ephemeron_tombstone_raw (int);
void ves_icall_System_GC_SuppressFinalize_raw (int,int);
void ves_icall_System_GC_ReRegisterForFinalize_raw (int,int);
void ves_icall_System_GC_GetGCMemoryInfo (int,int,int,int,int,int);
int ves_icall_System_GC_AllocPinnedArray_raw (int,int,int);
int ves_icall_System_Object_MemberwiseClone_raw (int,int);
double ves_icall_System_Math_Ceiling (double);
double ves_icall_System_Math_Cos (double);
double ves_icall_System_Math_Floor (double);
double ves_icall_System_Math_Log10 (double);
double ves_icall_System_Math_Pow (double,double);
double ves_icall_System_Math_Sin (double);
double ves_icall_System_Math_Sqrt (double);
double ves_icall_System_Math_Tan (double);
double ves_icall_System_Math_ModF (double,int);
void ves_icall_RuntimeMethodHandle_ReboxFromNullable_raw (int,int,int);
void ves_icall_RuntimeMethodHandle_ReboxToNullable_raw (int,int,int,int);
int ves_icall_RuntimeType_GetCorrespondingInflatedMethod_raw (int,int,int);
void ves_icall_RuntimeType_make_array_type_raw (int,int,int,int);
void ves_icall_RuntimeType_make_byref_type_raw (int,int,int);
void ves_icall_RuntimeType_make_pointer_type_raw (int,int,int);
void ves_icall_RuntimeType_MakeGenericType_raw (int,int,int,int);
int ves_icall_RuntimeType_GetMethodsByName_native_raw (int,int,int,int,int);
int ves_icall_RuntimeType_GetPropertiesByName_native_raw (int,int,int,int,int);
int ves_icall_RuntimeType_GetConstructors_native_raw (int,int,int);
int ves_icall_System_RuntimeType_CreateInstanceInternal_raw (int,int);
void ves_icall_System_RuntimeType_AllocateValueType_raw (int,int,int,int);
void ves_icall_RuntimeType_GetDeclaringMethod_raw (int,int,int);
void ves_icall_System_RuntimeType_getFullName_raw (int,int,int,int,int);
void ves_icall_RuntimeType_GetGenericArgumentsInternal_raw (int,int,int,int);
int ves_icall_RuntimeType_GetGenericParameterPosition (int);
int ves_icall_RuntimeType_GetEvents_native_raw (int,int,int,int);
int ves_icall_RuntimeType_GetFields_native_raw (int,int,int,int,int);
void ves_icall_RuntimeType_GetInterfaces_raw (int,int,int);
int ves_icall_RuntimeType_GetNestedTypes_native_raw (int,int,int,int,int);
void ves_icall_RuntimeType_GetDeclaringType_raw (int,int,int);
void ves_icall_RuntimeType_GetName_raw (int,int,int);
void ves_icall_RuntimeType_GetNamespace_raw (int,int,int);
int ves_icall_RuntimeType_FunctionPointerReturnAndParameterTypes_raw (int,int);
int ves_icall_RuntimeTypeHandle_GetAttributes (int);
int ves_icall_RuntimeTypeHandle_GetMetadataToken_raw (int,int);
void ves_icall_RuntimeTypeHandle_GetGenericTypeDefinition_impl_raw (int,int,int);
int ves_icall_RuntimeTypeHandle_GetCorElementType (int);
int ves_icall_RuntimeTypeHandle_HasInstantiation (int);
int ves_icall_RuntimeTypeHandle_IsComObject_raw (int,int);
int ves_icall_RuntimeTypeHandle_IsInstanceOfType_raw (int,int,int);
int ves_icall_RuntimeTypeHandle_HasReferences_raw (int,int);
int ves_icall_RuntimeTypeHandle_GetArrayRank_raw (int,int);
void ves_icall_RuntimeTypeHandle_GetAssembly_raw (int,int,int);
void ves_icall_RuntimeTypeHandle_GetElementType_raw (int,int,int);
void ves_icall_RuntimeTypeHandle_GetModule_raw (int,int,int);
void ves_icall_RuntimeTypeHandle_GetBaseType_raw (int,int,int);
int ves_icall_RuntimeTypeHandle_type_is_assignable_from_raw (int,int,int);
int ves_icall_RuntimeTypeHandle_IsGenericTypeDefinition (int);
int ves_icall_RuntimeTypeHandle_GetGenericParameterInfo_raw (int,int);
int ves_icall_RuntimeTypeHandle_is_subclass_of_raw (int,int,int);
int ves_icall_RuntimeTypeHandle_IsByRefLike_raw (int,int);
void ves_icall_System_RuntimeTypeHandle_internal_from_name_raw (int,int,int,int,int,int);
int ves_icall_System_String_FastAllocateString_raw (int,int);
int ves_icall_System_String_InternalIsInterned_raw (int,int);
int ves_icall_System_String_InternalIntern_raw (int,int);
int ves_icall_System_Type_internal_from_handle_raw (int,int);
int ves_icall_System_ValueType_InternalGetHashCode_raw (int,int,int);
int ves_icall_System_ValueType_Equals_raw (int,int,int,int);
int ves_icall_System_Threading_Interlocked_CompareExchange_Int (int,int,int);
void ves_icall_System_Threading_Interlocked_CompareExchange_Object (int,int,int,int);
int ves_icall_System_Threading_Interlocked_Decrement_Int (int);
int ves_icall_System_Threading_Interlocked_Increment_Int (int);
int64_t ves_icall_System_Threading_Interlocked_Increment_Long (int);
int ves_icall_System_Threading_Interlocked_Exchange_Int (int,int);
void ves_icall_System_Threading_Interlocked_Exchange_Object (int,int,int);
int64_t ves_icall_System_Threading_Interlocked_CompareExchange_Long (int,int64_t,int64_t);
int64_t ves_icall_System_Threading_Interlocked_Exchange_Long (int,int64_t);
int64_t ves_icall_System_Threading_Interlocked_Read_Long (int);
int ves_icall_System_Threading_Interlocked_Add_Int (int,int);
int64_t ves_icall_System_Threading_Interlocked_Add_Long (int,int64_t);
void ves_icall_System_Threading_Monitor_Monitor_Enter_raw (int,int);
void mono_monitor_exit_icall_raw (int,int);
void ves_icall_System_Threading_Monitor_Monitor_pulse_raw (int,int);
void ves_icall_System_Threading_Monitor_Monitor_pulse_all_raw (int,int);
int ves_icall_System_Threading_Monitor_Monitor_wait_raw (int,int,int,int);
void ves_icall_System_Threading_Monitor_Monitor_try_enter_with_atomic_var_raw (int,int,int,int,int);
void ves_icall_System_Threading_Thread_InitInternal_raw (int,int);
int ves_icall_System_Threading_Thread_GetCurrentThread ();
void ves_icall_System_Threading_InternalThread_Thread_free_internal_raw (int,int);
int ves_icall_System_Threading_Thread_GetState_raw (int,int);
void ves_icall_System_Threading_Thread_SetState_raw (int,int,int);
void ves_icall_System_Threading_Thread_ClrState_raw (int,int,int);
void ves_icall_System_Threading_Thread_SetName_icall_raw (int,int,int,int);
int ves_icall_System_Threading_Thread_YieldInternal ();
void ves_icall_System_Threading_Thread_SetPriority_raw (int,int,int);
void ves_icall_System_Runtime_Loader_AssemblyLoadContext_PrepareForAssemblyLoadContextRelease_raw (int,int,int);
int ves_icall_System_Runtime_Loader_AssemblyLoadContext_GetLoadContextForAssembly_raw (int,int);
int ves_icall_System_Runtime_Loader_AssemblyLoadContext_InternalLoadFile_raw (int,int,int,int);
int ves_icall_System_Runtime_Loader_AssemblyLoadContext_InternalInitializeNativeALC_raw (int,int,int,int,int);
int ves_icall_System_Runtime_Loader_AssemblyLoadContext_InternalLoadFromStream_raw (int,int,int,int,int,int);
int ves_icall_System_Runtime_Loader_AssemblyLoadContext_InternalGetLoadedAssemblies_raw (int);
int ves_icall_System_GCHandle_InternalAlloc_raw (int,int,int);
void ves_icall_System_GCHandle_InternalFree_raw (int,int);
int ves_icall_System_GCHandle_InternalGet_raw (int,int);
void ves_icall_System_GCHandle_InternalSet_raw (int,int,int);
int ves_icall_System_Runtime_InteropServices_Marshal_GetLastPInvokeError ();
void ves_icall_System_Runtime_InteropServices_Marshal_SetLastPInvokeError (int);
void ves_icall_System_Runtime_InteropServices_Marshal_StructureToPtr_raw (int,int,int,int);
int ves_icall_System_Runtime_InteropServices_Marshal_SizeOfHelper_raw (int,int,int);
int ves_icall_System_Runtime_InteropServices_NativeLibrary_LoadByName_raw (int,int,int,int,int,int);
int ves_icall_System_Runtime_CompilerServices_RuntimeHelpers_InternalGetHashCode_raw (int,int);
int ves_icall_System_Runtime_CompilerServices_RuntimeHelpers_InternalTryGetHashCode_raw (int,int);
int ves_icall_System_Runtime_CompilerServices_RuntimeHelpers_GetObjectValue_raw (int,int);
int ves_icall_System_Runtime_CompilerServices_RuntimeHelpers_GetUninitializedObjectInternal_raw (int,int);
void ves_icall_System_Runtime_CompilerServices_RuntimeHelpers_InitializeArray_raw (int,int,int);
int ves_icall_System_Runtime_CompilerServices_RuntimeHelpers_GetSpanDataFrom_raw (int,int,int,int);
int ves_icall_System_Runtime_CompilerServices_RuntimeHelpers_SufficientExecutionStack ();
int ves_icall_System_Reflection_Assembly_GetEntryAssembly_raw (int);
int ves_icall_System_Reflection_Assembly_InternalLoad_raw (int,int,int,int);
int ves_icall_System_Reflection_Assembly_InternalGetType_raw (int,int,int,int,int,int);
int ves_icall_System_Reflection_AssemblyName_GetNativeName (int);
int ves_icall_MonoCustomAttrs_GetCustomAttributesInternal_raw (int,int,int,int);
int ves_icall_MonoCustomAttrs_GetCustomAttributesDataInternal_raw (int,int);
int ves_icall_MonoCustomAttrs_IsDefinedInternal_raw (int,int,int);
int ves_icall_System_Reflection_FieldInfo_internal_from_handle_type_raw (int,int,int);
int ves_icall_System_Reflection_FieldInfo_get_marshal_info_raw (int,int);
int ves_icall_System_Reflection_LoaderAllocatorScout_Destroy (int);
void ves_icall_System_Reflection_RuntimeAssembly_GetManifestResourceNames_raw (int,int,int);
void ves_icall_System_Reflection_RuntimeAssembly_GetExportedTypes_raw (int,int,int);
void ves_icall_System_Reflection_RuntimeAssembly_GetInfo_raw (int,int,int,int);
int ves_icall_System_Reflection_RuntimeAssembly_GetManifestResourceInternal_raw (int,int,int,int,int);
void ves_icall_System_Reflection_Assembly_GetManifestModuleInternal_raw (int,int,int);
void ves_icall_System_Reflection_RuntimeCustomAttributeData_ResolveArgumentsInternal_raw (int,int,int,int,int,int,int);
void ves_icall_RuntimeEventInfo_get_event_info_raw (int,int,int);
int ves_icall_reflection_get_token_raw (int,int);
int ves_icall_System_Reflection_EventInfo_internal_from_handle_type_raw (int,int,int);
int ves_icall_RuntimeFieldInfo_ResolveType_raw (int,int);
int ves_icall_RuntimeFieldInfo_GetParentType_raw (int,int,int);
int ves_icall_RuntimeFieldInfo_GetFieldOffset_raw (int,int);
int ves_icall_RuntimeFieldInfo_GetValueInternal_raw (int,int,int);
void ves_icall_RuntimeFieldInfo_SetValueInternal_raw (int,int,int,int);
int ves_icall_RuntimeFieldInfo_GetRawConstantValue_raw (int,int);
int ves_icall_reflection_get_token_raw (int,int);
void ves_icall_get_method_info_raw (int,int,int);
int ves_icall_get_method_attributes (int);
int ves_icall_System_Reflection_MonoMethodInfo_get_parameter_info_raw (int,int,int);
int ves_icall_System_MonoMethodInfo_get_retval_marshal_raw (int,int);
int ves_icall_System_Reflection_RuntimeMethodInfo_GetMethodFromHandleInternalType_native_raw (int,int,int,int);
int ves_icall_RuntimeMethodInfo_get_name_raw (int,int);
int ves_icall_RuntimeMethodInfo_get_base_method_raw (int,int,int);
int ves_icall_reflection_get_token_raw (int,int);
int ves_icall_InternalInvoke_raw (int,int,int,int,int);
void ves_icall_RuntimeMethodInfo_GetPInvoke_raw (int,int,int,int,int);
int ves_icall_RuntimeMethodInfo_MakeGenericMethod_impl_raw (int,int,int);
int ves_icall_RuntimeMethodInfo_GetGenericArguments_raw (int,int);
int ves_icall_RuntimeMethodInfo_GetGenericMethodDefinition_raw (int,int);
int ves_icall_RuntimeMethodInfo_get_IsGenericMethodDefinition_raw (int,int);
int ves_icall_RuntimeMethodInfo_get_IsGenericMethod_raw (int,int);
void ves_icall_InvokeClassConstructor_raw (int,int);
int ves_icall_InternalInvoke_raw (int,int,int,int,int);
int ves_icall_reflection_get_token_raw (int,int);
int ves_icall_System_Reflection_RuntimeModule_ResolveMethodToken_raw (int,int,int,int,int,int);
void ves_icall_RuntimePropertyInfo_get_property_info_raw (int,int,int,int);
int ves_icall_reflection_get_token_raw (int,int);
int ves_icall_System_Reflection_RuntimePropertyInfo_internal_from_handle_type_raw (int,int,int);
void ves_icall_DynamicMethod_create_dynamic_method_raw (int,int,int,int,int);
void ves_icall_AssemblyBuilder_basic_init_raw (int,int);
void ves_icall_AssemblyBuilder_UpdateNativeCustomAttributes_raw (int,int);
void ves_icall_ModuleBuilder_basic_init_raw (int,int);
void ves_icall_ModuleBuilder_set_wrappers_type_raw (int,int,int);
int ves_icall_ModuleBuilder_getUSIndex_raw (int,int,int);
int ves_icall_ModuleBuilder_getToken_raw (int,int,int,int);
int ves_icall_ModuleBuilder_getMethodToken_raw (int,int,int,int);
void ves_icall_ModuleBuilder_RegisterToken_raw (int,int,int,int);
int ves_icall_TypeBuilder_create_runtime_class_raw (int,int);
int ves_icall_System_IO_Stream_HasOverriddenBeginEndRead_raw (int,int);
int ves_icall_System_IO_Stream_HasOverriddenBeginEndWrite_raw (int,int);
int ves_icall_System_Diagnostics_Debugger_IsLogging ();
void ves_icall_System_Diagnostics_Debugger_Log (int,int,int);
int ves_icall_System_Diagnostics_StackFrame_GetFrameInfo (int,int,int,int,int,int,int,int);
void ves_icall_System_Diagnostics_StackTrace_GetTrace (int,int,int,int);
int ves_icall_Mono_RuntimeClassHandle_GetTypeFromClass (int);
void ves_icall_Mono_RuntimeGPtrArrayHandle_GPtrArrayFree (int);
int ves_icall_Mono_SafeStringMarshal_StringToUtf8 (int);
void ves_icall_Mono_SafeStringMarshal_GFree (int);
static void *corlib_icall_funcs [] = {
// token 231,
ves_icall_System_Array_InternalCreate,
// token 241,
ves_icall_System_Array_GetCorElementTypeOfElementTypeInternal,
// token 242,
ves_icall_System_Array_IsValueOfElementTypeInternal,
// token 243,
ves_icall_System_Array_CanChangePrimitive,
// token 244,
ves_icall_System_Array_FastCopy,
// token 245,
ves_icall_System_Array_GetLengthInternal_raw,
// token 246,
ves_icall_System_Array_GetLowerBoundInternal_raw,
// token 247,
ves_icall_System_Array_GetGenericValue_icall,
// token 248,
ves_icall_System_Array_GetValueImpl_raw,
// token 249,
ves_icall_System_Array_SetGenericValue_icall,
// token 252,
ves_icall_System_Array_SetValueImpl_raw,
// token 253,
ves_icall_System_Array_SetValueRelaxedImpl_raw,
// token 360,
ves_icall_System_Runtime_RuntimeImports_ZeroMemory,
// token 361,
ves_icall_System_Runtime_RuntimeImports_Memmove,
// token 362,
ves_icall_System_Buffer_BulkMoveWithWriteBarrier,
// token 391,
ves_icall_System_Delegate_AllocDelegateLike_internal_raw,
// token 392,
ves_icall_System_Delegate_CreateDelegate_internal_raw,
// token 393,
ves_icall_System_Delegate_GetVirtualMethod_internal_raw,
// token 413,
ves_icall_System_Enum_GetEnumValuesAndNames_raw,
// token 414,
ves_icall_System_Enum_InternalBoxEnum_raw,
// token 415,
ves_icall_System_Enum_InternalGetCorElementType,
// token 416,
ves_icall_System_Enum_InternalGetUnderlyingType_raw,
// token 513,
ves_icall_System_Environment_get_ProcessorCount,
// token 514,
ves_icall_System_Environment_get_TickCount,
// token 515,
ves_icall_System_Environment_get_TickCount64,
// token 518,
ves_icall_System_Environment_FailFast_raw,
// token 555,
ves_icall_System_GC_GetMaxGeneration,
// token 556,
ves_icall_System_GC_InternalCollect,
// token 557,
ves_icall_System_GC_register_ephemeron_array_raw,
// token 558,
ves_icall_System_GC_get_ephemeron_tombstone_raw,
// token 562,
ves_icall_System_GC_SuppressFinalize_raw,
// token 564,
ves_icall_System_GC_ReRegisterForFinalize_raw,
// token 566,
ves_icall_System_GC_GetGCMemoryInfo,
// token 568,
ves_icall_System_GC_AllocPinnedArray_raw,
// token 573,
ves_icall_System_Object_MemberwiseClone_raw,
// token 581,
ves_icall_System_Math_Ceiling,
// token 582,
ves_icall_System_Math_Cos,
// token 583,
ves_icall_System_Math_Floor,
// token 584,
ves_icall_System_Math_Log10,
// token 585,
ves_icall_System_Math_Pow,
// token 586,
ves_icall_System_Math_Sin,
// token 587,
ves_icall_System_Math_Sqrt,
// token 588,
ves_icall_System_Math_Tan,
// token 589,
ves_icall_System_Math_ModF,
// token 685,
ves_icall_RuntimeMethodHandle_ReboxFromNullable_raw,
// token 686,
ves_icall_RuntimeMethodHandle_ReboxToNullable_raw,
// token 751,
ves_icall_RuntimeType_GetCorrespondingInflatedMethod_raw,
// token 757,
ves_icall_RuntimeType_make_array_type_raw,
// token 760,
ves_icall_RuntimeType_make_byref_type_raw,
// token 762,
ves_icall_RuntimeType_make_pointer_type_raw,
// token 767,
ves_icall_RuntimeType_MakeGenericType_raw,
// token 768,
ves_icall_RuntimeType_GetMethodsByName_native_raw,
// token 770,
ves_icall_RuntimeType_GetPropertiesByName_native_raw,
// token 771,
ves_icall_RuntimeType_GetConstructors_native_raw,
// token 775,
ves_icall_System_RuntimeType_CreateInstanceInternal_raw,
// token 776,
ves_icall_System_RuntimeType_AllocateValueType_raw,
// token 778,
ves_icall_RuntimeType_GetDeclaringMethod_raw,
// token 780,
ves_icall_System_RuntimeType_getFullName_raw,
// token 781,
ves_icall_RuntimeType_GetGenericArgumentsInternal_raw,
// token 784,
ves_icall_RuntimeType_GetGenericParameterPosition,
// token 785,
ves_icall_RuntimeType_GetEvents_native_raw,
// token 786,
ves_icall_RuntimeType_GetFields_native_raw,
// token 789,
ves_icall_RuntimeType_GetInterfaces_raw,
// token 791,
ves_icall_RuntimeType_GetNestedTypes_native_raw,
// token 794,
ves_icall_RuntimeType_GetDeclaringType_raw,
// token 796,
ves_icall_RuntimeType_GetName_raw,
// token 798,
ves_icall_RuntimeType_GetNamespace_raw,
// token 807,
ves_icall_RuntimeType_FunctionPointerReturnAndParameterTypes_raw,
// token 871,
ves_icall_RuntimeTypeHandle_GetAttributes,
// token 873,
ves_icall_RuntimeTypeHandle_GetMetadataToken_raw,
// token 875,
ves_icall_RuntimeTypeHandle_GetGenericTypeDefinition_impl_raw,
// token 885,
ves_icall_RuntimeTypeHandle_GetCorElementType,
// token 886,
ves_icall_RuntimeTypeHandle_HasInstantiation,
// token 887,
ves_icall_RuntimeTypeHandle_IsComObject_raw,
// token 888,
ves_icall_RuntimeTypeHandle_IsInstanceOfType_raw,
// token 890,
ves_icall_RuntimeTypeHandle_HasReferences_raw,
// token 897,
ves_icall_RuntimeTypeHandle_GetArrayRank_raw,
// token 898,
ves_icall_RuntimeTypeHandle_GetAssembly_raw,
// token 899,
ves_icall_RuntimeTypeHandle_GetElementType_raw,
// token 900,
ves_icall_RuntimeTypeHandle_GetModule_raw,
// token 901,
ves_icall_RuntimeTypeHandle_GetBaseType_raw,
// token 909,
ves_icall_RuntimeTypeHandle_type_is_assignable_from_raw,
// token 910,
ves_icall_RuntimeTypeHandle_IsGenericTypeDefinition,
// token 911,
ves_icall_RuntimeTypeHandle_GetGenericParameterInfo_raw,
// token 915,
ves_icall_RuntimeTypeHandle_is_subclass_of_raw,
// token 916,
ves_icall_RuntimeTypeHandle_IsByRefLike_raw,
// token 918,
ves_icall_System_RuntimeTypeHandle_internal_from_name_raw,
// token 922,
ves_icall_System_String_FastAllocateString_raw,
// token 923,
ves_icall_System_String_InternalIsInterned_raw,
// token 924,
ves_icall_System_String_InternalIntern_raw,
// token 1203,
ves_icall_System_Type_internal_from_handle_raw,
// token 1379,
ves_icall_System_ValueType_InternalGetHashCode_raw,
// token 1380,
ves_icall_System_ValueType_Equals_raw,
// token 7398,
ves_icall_System_Threading_Interlocked_CompareExchange_Int,
// token 7399,
ves_icall_System_Threading_Interlocked_CompareExchange_Object,
// token 7401,
ves_icall_System_Threading_Interlocked_Decrement_Int,
// token 7402,
ves_icall_System_Threading_Interlocked_Increment_Int,
// token 7403,
ves_icall_System_Threading_Interlocked_Increment_Long,
// token 7404,
ves_icall_System_Threading_Interlocked_Exchange_Int,
// token 7405,
ves_icall_System_Threading_Interlocked_Exchange_Object,
// token 7407,
ves_icall_System_Threading_Interlocked_CompareExchange_Long,
// token 7409,
ves_icall_System_Threading_Interlocked_Exchange_Long,
// token 7411,
ves_icall_System_Threading_Interlocked_Read_Long,
// token 7412,
ves_icall_System_Threading_Interlocked_Add_Int,
// token 7413,
ves_icall_System_Threading_Interlocked_Add_Long,
// token 7423,
ves_icall_System_Threading_Monitor_Monitor_Enter_raw,
// token 7425,
mono_monitor_exit_icall_raw,
// token 7432,
ves_icall_System_Threading_Monitor_Monitor_pulse_raw,
// token 7434,
ves_icall_System_Threading_Monitor_Monitor_pulse_all_raw,
// token 7436,
ves_icall_System_Threading_Monitor_Monitor_wait_raw,
// token 7438,
ves_icall_System_Threading_Monitor_Monitor_try_enter_with_atomic_var_raw,
// token 7489,
ves_icall_System_Threading_Thread_InitInternal_raw,
// token 7490,
ves_icall_System_Threading_Thread_GetCurrentThread,
// token 7492,
ves_icall_System_Threading_InternalThread_Thread_free_internal_raw,
// token 7493,
ves_icall_System_Threading_Thread_GetState_raw,
// token 7494,
ves_icall_System_Threading_Thread_SetState_raw,
// token 7495,
ves_icall_System_Threading_Thread_ClrState_raw,
// token 7496,
ves_icall_System_Threading_Thread_SetName_icall_raw,
// token 7498,
ves_icall_System_Threading_Thread_YieldInternal,
// token 7500,
ves_icall_System_Threading_Thread_SetPriority_raw,
// token 8554,
ves_icall_System_Runtime_Loader_AssemblyLoadContext_PrepareForAssemblyLoadContextRelease_raw,
// token 8558,
ves_icall_System_Runtime_Loader_AssemblyLoadContext_GetLoadContextForAssembly_raw,
// token 8560,
ves_icall_System_Runtime_Loader_AssemblyLoadContext_InternalLoadFile_raw,
// token 8561,
ves_icall_System_Runtime_Loader_AssemblyLoadContext_InternalInitializeNativeALC_raw,
// token 8562,
ves_icall_System_Runtime_Loader_AssemblyLoadContext_InternalLoadFromStream_raw,
// token 8563,
ves_icall_System_Runtime_Loader_AssemblyLoadContext_InternalGetLoadedAssemblies_raw,
// token 8812,
ves_icall_System_GCHandle_InternalAlloc_raw,
// token 8813,
ves_icall_System_GCHandle_InternalFree_raw,
// token 8814,
ves_icall_System_GCHandle_InternalGet_raw,
// token 8815,
ves_icall_System_GCHandle_InternalSet_raw,
// token 8833,
ves_icall_System_Runtime_InteropServices_Marshal_GetLastPInvokeError,
// token 8834,
ves_icall_System_Runtime_InteropServices_Marshal_SetLastPInvokeError,
// token 8835,
ves_icall_System_Runtime_InteropServices_Marshal_StructureToPtr_raw,
// token 8837,
ves_icall_System_Runtime_InteropServices_Marshal_SizeOfHelper_raw,
// token 8880,
ves_icall_System_Runtime_InteropServices_NativeLibrary_LoadByName_raw,
// token 8953,
ves_icall_System_Runtime_CompilerServices_RuntimeHelpers_InternalGetHashCode_raw,
// token 8955,
ves_icall_System_Runtime_CompilerServices_RuntimeHelpers_InternalTryGetHashCode_raw,
// token 8957,
ves_icall_System_Runtime_CompilerServices_RuntimeHelpers_GetObjectValue_raw,
// token 8966,
ves_icall_System_Runtime_CompilerServices_RuntimeHelpers_GetUninitializedObjectInternal_raw,
// token 8967,
ves_icall_System_Runtime_CompilerServices_RuntimeHelpers_InitializeArray_raw,
// token 8968,
ves_icall_System_Runtime_CompilerServices_RuntimeHelpers_GetSpanDataFrom_raw,
// token 8969,
ves_icall_System_Runtime_CompilerServices_RuntimeHelpers_SufficientExecutionStack,
// token 9416,
ves_icall_System_Reflection_Assembly_GetEntryAssembly_raw,
// token 9421,
ves_icall_System_Reflection_Assembly_InternalLoad_raw,
// token 9422,
ves_icall_System_Reflection_Assembly_InternalGetType_raw,
// token 9449,
ves_icall_System_Reflection_AssemblyName_GetNativeName,
// token 9467,
ves_icall_MonoCustomAttrs_GetCustomAttributesInternal_raw,
// token 9474,
ves_icall_MonoCustomAttrs_GetCustomAttributesDataInternal_raw,
// token 9481,
ves_icall_MonoCustomAttrs_IsDefinedInternal_raw,
// token 9492,
ves_icall_System_Reflection_FieldInfo_internal_from_handle_type_raw,
// token 9495,
ves_icall_System_Reflection_FieldInfo_get_marshal_info_raw,
// token 9515,
ves_icall_System_Reflection_LoaderAllocatorScout_Destroy,
// token 9588,
ves_icall_System_Reflection_RuntimeAssembly_GetManifestResourceNames_raw,
// token 9590,
ves_icall_System_Reflection_RuntimeAssembly_GetExportedTypes_raw,
// token 9599,
ves_icall_System_Reflection_RuntimeAssembly_GetInfo_raw,
// token 9601,
ves_icall_System_Reflection_RuntimeAssembly_GetManifestResourceInternal_raw,
// token 9602,
ves_icall_System_Reflection_Assembly_GetManifestModuleInternal_raw,
// token 9609,
ves_icall_System_Reflection_RuntimeCustomAttributeData_ResolveArgumentsInternal_raw,
// token 9623,
ves_icall_RuntimeEventInfo_get_event_info_raw,
// token 9643,
ves_icall_reflection_get_token_raw,
// token 9644,
ves_icall_System_Reflection_EventInfo_internal_from_handle_type_raw,
// token 9652,
ves_icall_RuntimeFieldInfo_ResolveType_raw,
// token 9654,
ves_icall_RuntimeFieldInfo_GetParentType_raw,
// token 9661,
ves_icall_RuntimeFieldInfo_GetFieldOffset_raw,
// token 9662,
ves_icall_RuntimeFieldInfo_GetValueInternal_raw,
// token 9665,
ves_icall_RuntimeFieldInfo_SetValueInternal_raw,
// token 9667,
ves_icall_RuntimeFieldInfo_GetRawConstantValue_raw,
// token 9672,
ves_icall_reflection_get_token_raw,
// token 9678,
ves_icall_get_method_info_raw,
// token 9679,
ves_icall_get_method_attributes,
// token 9686,
ves_icall_System_Reflection_MonoMethodInfo_get_parameter_info_raw,
// token 9688,
ves_icall_System_MonoMethodInfo_get_retval_marshal_raw,
// token 9700,
ves_icall_System_Reflection_RuntimeMethodInfo_GetMethodFromHandleInternalType_native_raw,
// token 9703,
ves_icall_RuntimeMethodInfo_get_name_raw,
// token 9704,
ves_icall_RuntimeMethodInfo_get_base_method_raw,
// token 9705,
ves_icall_reflection_get_token_raw,
// token 9716,
ves_icall_InternalInvoke_raw,
// token 9725,
ves_icall_RuntimeMethodInfo_GetPInvoke_raw,
// token 9731,
ves_icall_RuntimeMethodInfo_MakeGenericMethod_impl_raw,
// token 9732,
ves_icall_RuntimeMethodInfo_GetGenericArguments_raw,
// token 9733,
ves_icall_RuntimeMethodInfo_GetGenericMethodDefinition_raw,
// token 9735,
ves_icall_RuntimeMethodInfo_get_IsGenericMethodDefinition_raw,
// token 9736,
ves_icall_RuntimeMethodInfo_get_IsGenericMethod_raw,
// token 9753,
ves_icall_InvokeClassConstructor_raw,
// token 9755,
ves_icall_InternalInvoke_raw,
// token 9769,
ves_icall_reflection_get_token_raw,
// token 9786,
ves_icall_System_Reflection_RuntimeModule_ResolveMethodToken_raw,
// token 9813,
ves_icall_RuntimePropertyInfo_get_property_info_raw,
// token 9843,
ves_icall_reflection_get_token_raw,
// token 9844,
ves_icall_System_Reflection_RuntimePropertyInfo_internal_from_handle_type_raw,
// token 10328,
ves_icall_DynamicMethod_create_dynamic_method_raw,
// token 10420,
ves_icall_AssemblyBuilder_basic_init_raw,
// token 10421,
ves_icall_AssemblyBuilder_UpdateNativeCustomAttributes_raw,
// token 10623,
ves_icall_ModuleBuilder_basic_init_raw,
// token 10624,
ves_icall_ModuleBuilder_set_wrappers_type_raw,
// token 10631,
ves_icall_ModuleBuilder_getUSIndex_raw,
// token 10632,
ves_icall_ModuleBuilder_getToken_raw,
// token 10633,
ves_icall_ModuleBuilder_getMethodToken_raw,
// token 10638,
ves_icall_ModuleBuilder_RegisterToken_raw,
// token 10713,
ves_icall_TypeBuilder_create_runtime_class_raw,
// token 11226,
ves_icall_System_IO_Stream_HasOverriddenBeginEndRead_raw,
// token 11227,
ves_icall_System_IO_Stream_HasOverriddenBeginEndWrite_raw,
// token 11729,
ves_icall_System_Diagnostics_Debugger_IsLogging,
// token 11730,
ves_icall_System_Diagnostics_Debugger_Log,
// token 11735,
ves_icall_System_Diagnostics_StackFrame_GetFrameInfo,
// token 11745,
ves_icall_System_Diagnostics_StackTrace_GetTrace,
// token 12523,
ves_icall_Mono_RuntimeClassHandle_GetTypeFromClass,
// token 12544,
ves_icall_Mono_RuntimeGPtrArrayHandle_GPtrArrayFree,
// token 12546,
ves_icall_Mono_SafeStringMarshal_StringToUtf8,
// token 12548,
ves_icall_Mono_SafeStringMarshal_GFree,
};
static uint8_t corlib_icall_flags [] = {
0,
0,
0,
0,
0,
4,
4,
0,
4,
0,
4,
4,
0,
0,
0,
4,
4,
4,
4,
4,
0,
4,
0,
0,
0,
4,
0,
0,
4,
4,
4,
4,
0,
4,
4,
0,
0,
0,
0,
0,
0,
0,
0,
0,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
0,
4,
4,
4,
4,
4,
4,
4,
4,
0,
4,
4,
0,
0,
4,
4,
4,
4,
4,
4,
4,
4,
4,
0,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
4,
4,
4,
4,
4,
4,
4,
0,
4,
4,
4,
4,
4,
0,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
0,
0,
4,
4,
4,
4,
4,
4,
4,
4,
4,
0,
4,
4,
4,
0,
4,
4,
4,
4,
4,
0,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
0,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
0,
0,
0,
0,
0,
0,
0,
0,
};
